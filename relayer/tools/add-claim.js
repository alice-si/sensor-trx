const ContractUtils = require('../contract-utils');
const Config = require('../config');

const Authentication = ContractUtils.loadContract('Authentication');
const Project = ContractUtils.loadContract('Project');

ContractUtils.unlockMain().then(() => {
  console.log("Main account unlocked");

  let authentication = Authentication.at(Config.authenticationContractAddress);
  return authentication.getProjectAt(0, ContractUtils.getConf()).then(projectAddr => {
    console.log('Project was found: ' + projectAddr);
    let project = Project.at(projectAddr);
    let details = getClaimDetails();
    console.log('Add claim with details ');
    console.log(details);
    return project.addClaim(details.value, details.time, details.bounty, ContractUtils.getConf()).then(result => {
      console.log('Claim added');
      console.log(result);
    });
  });
}).catch(err => {
  console.log('ERROR');
  console.log(err);
});

function getClaimDetails() {
  return {
    value: 70,
    time: 10,
    bounty: 0
  };
}
