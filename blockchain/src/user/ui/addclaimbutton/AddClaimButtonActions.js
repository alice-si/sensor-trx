import store from '../../../store'
import ProjectContract from '../../../../build/contracts/Project.json'
const contract = require('truffle-contract')


export const CLAIM_ADDED = 'CLAIM_ADDED'
function claimAdded(result) {
  return {
    type: CLAIM_ADDED,
    payload: result
  }
}

export function addClaim(ppm, scheduledOn, bounty) {
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
        let bountyInWei = web3.toWei(bounty, 'ether')
        let scheduledTime = Date.parse(scheduledOn)
        console.log(scheduledTime)
        projectInstance.addClaim(ppm, scheduledTime, bountyInWei, {from: coinbase})
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
