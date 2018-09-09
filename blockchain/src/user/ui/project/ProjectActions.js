import store from '../../../store'
import ProjectContract from '../../../../build/contracts/Project.json'
// const contract = require('truffle-contract')


export const PROJECT_RECEIVED = 'PROJECT_RECEIVED'
function projectReceived(project) {
  return {
    type: PROJECT_RECEIVED,
    payload: project
  }
}

export function fetchProject() {
  let web3 = store.getState().web3.web3Instance
  let projectAddress = store.getState().user.data.project
  let projectName = store.getState().user.data.name

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return async function (dispatch) {
      // // // Using truffle-contract we create the authentication object.
      // let projectContract = contract(ProjectContract)
      // projectContract.setProvider(web3.currentProvider)
      // //
      // // // Declaring this for later so we can chain functions on Authentication.
      // let projectInstance = projectContract.at(projectAddress)

      web3.eth.getBalance("0x01db8c011f8caa93479fa6db874e08156c7d02ab", function(err, balance){
        dispatch(projectReceived({
          balance: balance.toNumber(),
          name: projectName,
          address: projectAddress,
        }))
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}