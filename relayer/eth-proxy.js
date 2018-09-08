const Web3 = require('web3');
const Contract = require('truffle-contract');
const Config = require('./config');

let EthProxy = function () {};

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let provider = web3.currentProvider;

EthProxy.processData = async function (data) {
    // TODO clean logging


    console.log("Starting data processing...");
    const Authentication = loadContract('Authentication');
    const Project = loadContract('Project');
    const ClaimsRegistry = loadContract('ClaimsRegistry');

    let authentication = Authentication.at(Config.authenticationContractAddress);

    console.log('Big loop entry');
    let projectsCount = await authentication.getProjectsCount.call();
    for (let i = 0; i < projectsCount; i++) {
        let projectAddr = await authentication.getProjectAt.call(i);
        let project = Project.at(projectAddr);
        let claimsRegistryAddr = await project.claimsRegistry.call();
        let claimsRegistry = ClaimsRegistry.at(claimsRegistryAddr);
        let claimsCount = await claimsRegistry.getClaimsCount.call();
        for (let claimNumber = 0; claimNumber < claimsCount; claimNumber++) {
          let claimDetails = await claimsRegistry.getClaimDetailsAt.call(claimNumber);
          if (fitToClaim(claimDetails, data)) {
            console.log('Fit to claim');
            console.log(claimDetails);
            project.validate(data.quality, data.time, claimNumber);
          } else {
            console.log('Does not fit to claim');
            console.log(claimDetails);
          }
        }
    }
};


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

function fitToClaim(claimDetails, data) {
  return !claimDetails[2] && data.time > claimDetails[1] && data.quality > claimDetails[0];
}

module.exports = EthProxy;