const Web3 = require('web3');
const Contract = require('truffle-contract');
const Promise = require('bluebird');

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let provider = web3.currentProvider;

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


  let project1 = await Project.new(config);
  let authentication = await Authentication.new(config);

  // add claims
  await project1.addClaim(50, 0, 0, config);
  await project1.addClaim(70, 100, 0, config);


  // // TODO I am not sure about setting it
  await authentication.signup('name1', config);
  await authentication.signup('qwe', config);

  let projectAddr1 = await authentication.getProjectAt(0);

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
  const contractsFolder = './build/contracts/';

  console.log('Getting artefacts from folder ' + contractsFolder);
  const artefacts = require(contractsFolder + contractName + '.json');

  console.log('Creating contractObj');
  var contractObj = Contract(artefacts);

  console.log('Contract obj created. Setting provider for contract obj');

  contractObj.setProvider(web3.currentProvider);

  console.log('Returning contract');
  return contractObj;
}

console.log('Deployment started...');

testDeployment();