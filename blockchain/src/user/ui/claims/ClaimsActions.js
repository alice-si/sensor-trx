import store from '../../../store'
import ClaimsRegistryContract from '../../../../build/contracts/ClaimsRegistry.json'
const contract = require('truffle-contract')


export const CLAIMS_RECEIVED = 'CLAIMS_RECEIVED'
function claimsReceived(claims) {
  return {
    type: CLAIMS_RECEIVED,
    payload: claims
  }
}

export function fetchClaims() {
  let web3 = store.getState().web3.web3Instance
  let claimsRegistryAddress = store.getState().user.data.claimsRegistryAddress
  console.log('claimsRegistryAddress', claimsRegistryAddress)

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      let claimsRegistry = contract(ClaimsRegistryContract)
      claimsRegistry.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      let claimsRegistryInstance = claimsRegistry.at(claimsRegistryAddress)

      console.log('claimsRegistryInstance', claimsRegistryInstance)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        claimsRegistryInstance.getClaimsCount({from: coinbase}).then((claimCount) => {
          const numClaims = claimCount.toNumber()
          console.log('numClaims', numClaims)
          let claims = []
          if (numClaims > 0) {
            const range = [...Array(claimCount.toNumber()).keys()]
            range.forEach((index) => {
              claimsRegistryInstance.getClaimDetailsAt(index)
                .then((claimDetails) => {
                  console.log(`claim at ${index}`, claimDetails)
                  claims.push({
                    minValue: claimDetails[0].toNumber(),
                    scheduledOn: new Date(claimDetails[1].toNumber()).toLocaleDateString(),
                    bounty: web3.fromWei(claimDetails[2].toNumber(), 'ether'),
                    isVerified: claimDetails[3],
                  })
                  dispatch(claimsReceived(claims))
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