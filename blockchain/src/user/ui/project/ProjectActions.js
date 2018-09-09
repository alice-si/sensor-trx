import store from '../../../store'

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
      web3.eth.getBalance(projectAddress, function(err, balance){
        dispatch(projectReceived({
          balance: web3.fromWei(balance, 'ether').toNumber(),
          name: projectName,
          address: projectAddress,
        }))
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}