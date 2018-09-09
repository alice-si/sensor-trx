import store from '../../../store'
import ProjectContract from '../../../../build/contracts/Project.json'

const contract = require('truffle-contract')

// 0x7064344afee2040582Be96fF8FeA2c56134A4493

export const SENSOR_ADDED = 'SENSOR_ADDED'
function sensorAdded(result) {
  return {
    type: SENSOR_ADDED,
    payload: result
  }
}

export function addSensor(sensorAddress) {
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

      // Attempt to add a sensor.
      projectInstance.addSensor(sensorAddress, {from: coinbase})
        .then(function(result) {
          console.log('addSensor result', result)
          dispatch(sensorAdded(result))
        })
        .catch(function(result) {
          console.error('Sensor was not added: ', result)
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}