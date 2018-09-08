var SensorsManager = artifacts.require("SensorsManager");
var ClaimsRegistry = artifacts.require("ClaimsRegistry");
var Project = artifacts.require("Project");

require("./test-setup");

contract('Project', function([owner, sensor1, sensor2, other]) {

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


  it("should add a claim", async function() {
    await project.addClaim(80, 1000);

    (await claimsRegistry.getClaimsCount()).should.be.bignumber.equal(1);
    [minValue, minTime, isValidated] = await claimsRegistry.getClaimDetailsAt(0);

    minValue.should.be.bignumber.equal(80);
    minTime.should.be.bignumber.equal(1000);
    isValidated.should.be.false;
  });


  it("should not validate below minValue", async function() {
    await project.validate(79, 1000, 0).shouldBeReverted();
  });


  it("should not validate below minTime", async function() {
    await project.validate(80, 999, 0).shouldBeReverted();
  });


  it("should validate with correct measurement", async function() {
    await project.validate(80, 1000, 0);

    [minValue, minTime, isValidated] = await claimsRegistry.getClaimDetailsAt(0);

    isValidated.should.be.true;
  });


  it("should not validate a validated claim", async function() {
    await project.validate(80, 1000, 0).shouldBeReverted();
  });

});
