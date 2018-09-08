import store from '../../../store'
import ProjectContract from '../../../../build/contracts/Project.json'
const contract = require('truffle-contract')

// TODO: take user input instead of hardcoded params
const CLAIM_MIN_VALUE = 10
const CLAIM_MIN_TIME = 20

export const CLAIM_ADDED = 'CLAIM_ADDED'
function claimAdded(result) {
  return {
    type: CLAIM_ADDED,
    payload: result
  }
}

export function addClaim() {
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

      // Attempt to add a claim.
      projectInstance.addClaim(CLAIM_MIN_VALUE, CLAIM_MIN_TIME, {from: coinbase})
        .then(function(result) {
          console.log('addClaim result', result)
          dispatch(claimAdded(result))
        })
        .catch(function(result) {
          console.error('Claim was not added: ', result)
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
