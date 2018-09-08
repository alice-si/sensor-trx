import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import ProjectContract from '../../../../build/contracts/Project.json'
import SensorsManagerContract from '../../../../build/contracts/SensorsManager.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

import { fetchSensors } from "../sensors/SensorsActions";

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to login user.
          var user = {};
          authenticationInstance.login({from: coinbase})
          .then(function(result) {
            // If no error, login user.
            user.name = web3.toUtf8(result)
            return authenticationInstance.getProject({from: coinbase});
          }).then(function(projectAddress) {
            console.log('projectAddress', projectAddress)
            user.project = projectAddress;

            let projectContract = contract(ProjectContract)
            projectContract.setProvider(web3.currentProvider)

            let projectInstance = projectContract.at(projectAddress)
            projectInstance.sensorsManager().then((sensorsManagerAddress) => {
              console.log('sensorsManagerAddress', sensorsManagerAddress)
              user.sensorsManagerAddress = sensorsManagerAddress

              dispatch(userLoggedIn(user));

              let sensorsManagerContract = contract(SensorsManagerContract)
              sensorsManagerContract.setProvider(web3.currentProvider)

              let sensorsManagerInstance = sensorsManagerContract.at(sensorsManagerAddress)
              sensorsManagerInstance.SensorActivated().watch ( (err, response) => {
                console.log('Sensor Activated Event', response)
                dispatch(fetchSensors())
              });
              sensorsManagerInstance.SensorDeactivated().watch ( (err, response) => {
                console.log('Sensor Deactivated Event', response)
                dispatch(fetchSensors())
              });
              sensorsManagerInstance.SensorAdded().watch ( (err, response) => {
                console.log('Sensor Added Event', response)
                dispatch(fetchSensors())
              });

              // Used a manual redirect here as opposed to a wrapper.
              // This way, once logged in a user can still access the home page.
              var currentLocation = browserHistory.getCurrentLocation()

              if ('redirect' in currentLocation.query)
              {
                return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
              }

              return browserHistory.push('/dashboard')
            })
          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!')

            return browserHistory.push('/signup')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
