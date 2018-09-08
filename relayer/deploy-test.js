// const Web3 = require('web3');
const Web3 = require('truffle-contract/node_modules/web3');
const Contract = require('truffle-contract');
const Promise = require('bluebird');
const Config = require('./config');

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3();
web3.setProvider(provider);

async function testDeployment() {
  // unlock mainAccount
  await Promise.promisify(web3.personal.unlockAccount)(Config.mainAccount, Config.mainPassword);


  const Project = loadContract('Project');
  // console.log(Project);
  const Authentication = loadContract('Authentication');

  var accounts = await Promise.promisify(web3.eth.getAccounts)();
  var mainAccount = accounts[0];

  console.log('Main account is equal: ' + mainAccount);

  const config = {
    from: mainAccount,
    gas: 6000000
  };


  let project1;
  return Authentication.new(config).then(function (authentication) {
    authentication.signup('name1', config).then(function () {
      return authentication.signup('qwe', config);
    }).then(function () {
      return authentication.getProjectAt(0);
    }).then(function (projectAddr1) {
      project1 = Project.at(projectAddr1);
      // add claims
      return project1.addClaim(50, 0, 0, config);
    }).then(function () {
      return project1.addClaim(70, 100, 0, config);
    }).then(function () {
      let res = {
        project1: project1.address,
        auth: authentication.address
      };

      console.log('Deploying finished');
      console.log(res);
    }).catch(function (err) {
      console.log('Error occured: ');
      console.log(err);
    });
  });
}


function loadContract(contractName) {
  // TODO clean logging
  console.log('Contract loading ' + contractName);
  const contractsFolder = '../blockchain/build/contracts/';

  console.log('Getting artefacts from folder ' + contractsFolder);
  const artefacts = require(contractsFolder + contractName + '.json');

  console.log('Creating contractObj');
  var contractObj = Contract(artefacts);

  console.log('Contract obj created. Setting provider for contract obj');

  contractObj.setProvider(provider);

  console.log('Returning contract');
  return contractObj;
}

console.log('Deployment started...');

testDeployment();