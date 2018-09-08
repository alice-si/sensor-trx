// const Web3 = require('web3');
const Web3 = require('truffle-contract/node_modules/web3');
const Contract = require('truffle-contract');
const Promise = require('bluebird');

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3();
web3.setProvider(provider);

async function testDeployment() {
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


  let authentication = await Authentication.new(config);

  // // TODO I am not sure about setting it
  await authentication.signup('name1', config);
  await authentication.signup('qwe', config);

  let projectAddr1 = await authentication.getProjectAt(0);
  let project1 = Project.at(projectAddr1);

  // add claims
  await project1.addClaim(50, 0, 0, config);
  await project1.addClaim(70, 100, 0, config);

  let res = {
    project1: projectAddr1,
    auth: authentication.address
  };

  console.log('Deploying finished');
  console.log(res);
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