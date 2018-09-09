let ContractUtils = {};

// const Web3 = require('web3');
const Web3 = require('truffle-contract/node_modules/web3');
const Contract = require('truffle-contract');
const Promise = require('bluebird');
const Config = require('./config');

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3();
web3.setProvider(provider);

ContractUtils.loadContract = function (contractName) {
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
};


ContractUtils.unlockMain = function () {
  return Promise.promisify(web3.personal.unlockAccount)(Config.mainAccount, Config.mainPassword);
};

ContractUtils.getConf = function () {
  return {
    from: Config.mainAccount,
    gas: 6000000
  };
}

module.exports = ContractUtils;