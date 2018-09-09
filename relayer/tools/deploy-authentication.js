const ContractUtils = require('../contract-utils');

const Authentication = ContractUtils.loadContract('Authentication');

ContractUtils.unlockMain().then(() => {
  console.log("Main account unlocked");

  return Authentication.new(ContractUtils.getConf()).then(result => {
    console.log('Authentication deployed');
    console.log(result);
  })
}).catch(err => {
  console.log('ERROR');
  console.log(err);
});