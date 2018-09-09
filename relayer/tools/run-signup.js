const ContractUtils = require('../contract-utils');
const Config = require('../config');

const Authentication = ContractUtils.loadContract('Authentication');

ContractUtils.unlockMain().then(() => {
  console.log("Main account unlocked");

  let user = generateName();
  console.log('Signup for user: ' + user);
  let authentication = Authentication.at(Config.authenticationContractAddress);
  return authentication.signup(user, ContractUtils.getConf()).then(result => {
    console.log('Signed up');
    console.log(result);
  });
}).catch(err => {
  console.log('ERROR');
  console.log(err);
});

function generateName() {
  return (new Date()).valueOf() + 'User';
}