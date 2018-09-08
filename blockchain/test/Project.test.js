var SensorsManager = artifacts.require("SensorsManager");
var ClaimsRegistry = artifacts.require("ClaimsRegistry");
var Project = artifacts.require("Project");

const ethUtil = require('ethereumjs-util');
const web3Utils = require('web3-utils');

require("./test-setup");

function getHash(value, timestamp) {
  return web3Utils.soliditySha3(
    {
      type: 'uint8',
      value: value
    },
    {
      type: 'uint256',
      value: timestamp
    }
  );
}

getSignature = async function(value, timestamp, account) {
  var hash = getHash(value, timestamp);
  var signature = await web3.eth.sign(account, hash);

  var signatureData = ethUtil.fromRpcSig(signature);
  let v = ethUtil.bufferToHex(signatureData.v);
  let r = ethUtil.bufferToHex(signatureData.r);
  let s = ethUtil.bufferToHex(signatureData.s);

  return [v, r, s];
}

contract('Project', function([owner, sensor1, sensor2, relay]) {

  var project, sensorsManager, claimsRegistry;

  before("Deploy Project contract", async function() {
    project = await Project.new();
    var sensorsManagerAddress = await project.sensorsManager();
    var claimsRegistryAddress = await project.claimsRegistry();

    sensorsManager = await SensorsManager.at(sensorsManagerAddress);
    claimsRegistry = await ClaimsRegistry.at(claimsRegistryAddress);
  });

  //Sensors logic

  it("should have no sensors", async function() {
    (await sensorsManager.getSensorsCount()).should.be.bignumber.equal(0);
  });


  it("should add two sensors", async function() {
    await project.addSensor(sensor1, {from: owner});
    await project.addSensor(sensor2, {from: owner});
  });


  it("should list sensors with statuses", async function() {
    (await sensorsManager.getSensorsCount()).should.be.bignumber.equal(2);

    (await sensorsManager.getSensorsAt(0)).should.be.equal(sensor1);
    (await sensorsManager.getSensorsAt(1)).should.be.equal(sensor2);

    (await sensorsManager.isSensorActive(sensor1)).should.be.false;
    (await sensorsManager.isSensorActive(sensor2)).should.be.false;
  });


  it("should activate sensor", async function() {
    (await project.activateSensor(sensor1));

    (await sensorsManager.isSensorActive(sensor1)).should.be.true;
    (await sensorsManager.isSensorActive(sensor2)).should.be.false;
  });


  it("should deactivate sensor", async function() {
    (await project.deactivateSensor(sensor1));

    (await sensorsManager.isSensorActive(sensor1)).should.be.false;
    (await sensorsManager.isSensorActive(sensor2)).should.be.false;
  });


  //Claims logic

  it("should have no claims", async function() {
    (await claimsRegistry.getClaimsCount()).should.be.bignumber.equal(0);
  });


  it("should not allow adding claim without a proper balance", async function() {
    await claimsRegistry.addClaim(80, 1000, web3.toWei(0.01, 'ether')).shouldBeReverted();
  });


  it("should load the project contract", async function() {
    await web3.eth.sendTransaction({from: owner, to: project.address, value: web3.toWei(0.01, 'ether')});

    web3.eth.getBalance(project.address).should.be.bignumber.equal(web3.toWei(0.01, 'ether'));
  });

  it("should add a claim", async function() {
    await project.addClaim(80, 1000, web3.toWei(0.01, 'ether'));

    (await claimsRegistry.getClaimsCount()).should.be.bignumber.equal(1);
    [minValue, minTime, bounty, isValidated] = await claimsRegistry.getClaimDetailsAt(0);

    minValue.should.be.bignumber.equal(80);
    minTime.should.be.bignumber.equal(1000);
    bounty.should.be.bignumber.equal(web3.toWei(0.01, 'ether'));
    isValidated.should.be.false;
  });


  it("should not validate below minValue", async function() {
    var hash = getHash(79, 1000);
    [v, r, s] = await getSignature(79, 1000, sensor1);

    await project.validate(hash, v, r, s, 79, 1000, 0).shouldBeReverted();
  });


  it("should not validate below minTime", async function() {
    var hash = getHash(80, 999);
    [v, r, s] = await getSignature(80, 100, sensor1);

    await project.validate(hash, v, r, s, 80, 999, 0).shouldBeReverted();
  });



  it("should validate with correct measurement", async function() {
    var before = web3.eth.getBalance(relay);

    var hash = getHash(80, 1000);
    [v, r, s] = await getSignature(80, 1000, sensor1);

    await project.activateSensor(sensor1);
    await project.validate(hash, v, r, s, 80, 1000, 0, {from: relay});

    [minValue, minTime, bounty, isValidated] = await claimsRegistry.getClaimDetailsAt(0);

    isValidated.should.be.true;
    var after = web3.eth.getBalance(relay);
    after.should.be.bignumber.greaterThan(before);
  });

  //
  //
  // it("should not validate a validated claim", async function() {
  //   await project.validate(80, 1000, 0).shouldBeReverted();
  // });

});
