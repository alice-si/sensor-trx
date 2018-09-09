import store from '../../../store'

export const FUNDS_ADDED = 'FUNDS_ADDED'
function fundsAdded(result) {
  return {
    type: FUNDS_ADDED,
    payload: result
  }
}

export function addFunds(fundsToAdd) {
  let web3 = store.getState().web3.web3Instance
  let projectAddress = store.getState().user.data.project

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error);
        }

        web3.eth.sendTransaction({
          from: coinbase,
          to: projectAddress,
          value: web3.toWei(fundsToAdd, 'ether')
        }, (error, result) => {
          if (error) { console.error(error) }
          dispatch(fundsAdded(result))
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
