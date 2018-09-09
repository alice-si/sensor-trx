import store from '../../../store'

// TODO: take user input instead of hardcoded params
const FUNDS_TO_ADD = 10

export const FUNDS_ADDED = 'FUNDS_ADDED'
function fundsAdded(result) {
  return {
    type: FUNDS_ADDED,
    payload: result
  }
}

export function addFunds() {
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
          value: web3.toWei(FUNDS_TO_ADD, 'ether')
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
