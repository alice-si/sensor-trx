import store from '../../../store'
import SensorsManagerContract from '../../../../build/contracts/SensorsManager.json'
const contract = require('truffle-contract')


export const SENSORS_RECEIVED = 'SENSORS_RECEIVED'
function sensorsReceived(sensors) {
  return {
    type: SENSORS_RECEIVED,
    payload: sensors
  }
}

export function fetchSensors() {
  let web3 = store.getState().web3.web3Instance
  let sensorsManagerAddress = store.getState().user.data.sensorsManagerAddress
  console.log('sensorsManagerAddress', sensorsManagerAddress)

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      let sensorsManager = contract(SensorsManagerContract)
      sensorsManager.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      let sensorsManagerInstance = sensorsManager.at(sensorsManagerAddress)

      console.log(sensorsManagerInstance)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        sensorsManagerInstance.getSensorsCount({from: coinbase}).then((sensorCount) => {
          const numSensors = sensorCount.toNumber()
          let sensors = []
          if (numSensors > 0) {
            const range = [...Array(numSensors).keys()]
            range.forEach((index) => {
              sensorsManagerInstance.getSensorsAt(index)
                .then((sensorAddress) => {
                  console.log(`sensor at ${index}`, sensorAddress)
                  return sensorAddress
                })
                .then((sensorAddress) => {
                  sensorsManagerInstance.isSensorActive(sensorAddress)
                    .then((isActive) => {
                      sensors.push({
                        address: sensorAddress,
                        isActive: isActive
                      })
                      dispatch(sensorsReceived(sensors))
                    })
                })
            })

          }
        })

      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}