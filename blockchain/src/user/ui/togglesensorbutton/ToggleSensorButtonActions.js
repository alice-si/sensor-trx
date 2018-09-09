import store from '../../../store'
import ProjectContract from '../../../../build/contracts/Project.json'

const contract = require('truffle-contract')

export const SENSOR_DEACTIVATED = 'SENSOR_DEACTIVATED'
function sensorDeactivated(result) {
  return {
    type: SENSOR_DEACTIVATED,
    payload: result
  }
}

export const SENSOR_ACTIVATED = 'SENSOR_ACTIVATED'
function sensorActivated(result) {
  return {
    type: SENSOR_ACTIVATED,
    payload: result
  }
}


export function deactivateSensor(sensorAddress) {
  let web3 = store.getState().web3.web3Instance
  let projectAddress = store.getState().user.data.project

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      let project = contract(ProjectContract)
      project.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      let projectInstance = project.at(projectAddress)

      console.log(projectInstance)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

      // Attempt to deactivate sensor.
      projectInstance.deactivateSensor(sensorAddress, {from: coinbase})
        .then(function(result) {
          console.log('deactivateSensor result', result)
          dispatch(sensorDeactivated(result))
        })
        .catch(function(result) {
          console.error('deactivateSensor threw an error: ', result)
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export function activateSensor(sensorAddress) {
  let web3 = store.getState().web3.web3Instance
  let projectAddress = store.getState().user.data.project

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      let project = contract(ProjectContract)
      project.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      let projectInstance = project.at(projectAddress)

      console.log(projectInstance)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

      // Attempt to activate sensor.
      projectInstance.activateSensor(sensorAddress, {from: coinbase})
        .then(function(result) {
          console.log('activateSensor result', result)
          dispatch(sensorActivated(result))
        })
        .catch(function(result) {
          console.error('activateSensor threw an error: ', result)
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
