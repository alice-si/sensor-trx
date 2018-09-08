const Web3 = require('truffle-contract/node_modules/web3');
const Contract = require('truffle-contract');
const Config = require('./config');
const Promise = require('bluebird');

let EthProxy = function () {};

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3();
web3.setProvider(provider);


EthProxy.processData = async function (data) {
    // TODO clean logging
    const config = {
      from: Config.mainAccount,
      gas: 6000000
    };


    console.log("Starting data processing...");
    const Authentication = loadContract('Authentication');
    const Project = loadContract('Project');
    const ClaimsRegistry = loadContract('ClaimsRegistry');

    let authentication = Authentication.at(Config.authenticationContractAddress);

    console.log('Big loop entry');
    let projectsCount = await authentication.getProjectsCount.call();
    console.log('Projects count = ' + projectsCount);
    for (let i = 0; i < projectsCount; i++) {
        let projectAddr = await authentication.getProjectAt.call(i);
        console.log('We are in the context of project with address: ' + projectAddr);
        let project = Project.at(projectAddr);
        let claimsRegistryAddr = await project.claimsRegistry.call();
        let claimsRegistry = ClaimsRegistry.at(claimsRegistryAddr);
        let claimsCount = await claimsRegistry.getClaimsCount.call();

        console.log('Claims count = ' + claimsCount);
        for (let claimNumber = 0; claimNumber < claimsCount; claimNumber++) {
          let claimDetails = await claimsRegistry.getClaimDetailsAt.call(claimNumber);
          if (fitToClaim(claimDetails, data)) {
            console.log('Fit to claim');
            console.log(claimDetails);
            await Promise.promisify(web3.personal.unlockAccount)(Config.mainAccount, Config.mainPassword);
            let result = await project.validate(data.quality, data.time, claimNumber, config);
            return result;
          } else {
            console.log('Does not fit to claim');
            console.log(claimDetails);
          }
        }
    }
    console.log("There were nothing fitted for saving to blockchain :(");
    return "Nothing";
};


// TODO remove this commented function
// EthProxy.saveInfo = function (data) {
//     console.log('Starting sending data to blockchain...: ' + JSON.stringify(data));
//     const Project = loadContract('Project');
//
//     // TODO clean logging later
//     console.log(Project);
//     console.log('Getting project at ' + Config.projectContractAddress);
//     let project = Project.at(Config.projectContractAddress);
//
//     console.log('Trying to validate on project');
//     return project.validate(data.quality, data.time);
// };

function loadContract(contractName) {
    // TODO clean logging later
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
  let claimMinTime = claimDetails[1].toNumber();
  let claimMinVal = claimDetails[0].toNumber();
  let claimDisabled = claimDetails[3];
  let claimBounty = claimDetails[2].toNumber(); // maybe will be used later
  console.log('Comparing ');
  console.log([claimMinVal, claimMinTime, claimDisabled]);
  return !claimDisabled && data.time >= claimMinTime && data.quality >= claimMinVal;
}

module.exports = EthProxy;