var SensorsManager = artifacts.require("SensorsManager");
var Project = artifacts.require("Project");

require("./test-setup");

contract('Project', function([owner, sensor1, sensor2, other]) {

  var project, sensorsManager;

  before("Deploy Project contract", async function() {
    project = await Project.new();
    var sensorsManagerAddress = await project.sensorsManager();
    sensorsManager = await SensorsManager.at(sensorsManagerAddress);
  });


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


});
