const Web3 = require('web3');
const Contract = require('truffle-contract');
const Config = require('./config');

let EthProxy = function () {};

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let provider = web3.currentProvider;

EthProxy.saveInfo = function (data) {
    console.log('Starting sending data to blockchain...: ' + JSON.stringify(data));
    const Project = loadContract('Project');

    // TODO clean logging
    console.log(Project);
    console.log('Getting project at ' + Config.projectContractAddress);
    let project = Project.at(Config.projectContractAddress);
    
    console.log('Trying to validate on project');
    return project.validate(data.quality, data.time);
};

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

module.exports = EthProxy;