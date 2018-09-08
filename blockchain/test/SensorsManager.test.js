var SensorsManager = artifacts.require("SensorsManager");

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

Promise.prototype.shouldBeReverted = async function () {
  await this.should.be.rejectedWith('VM Exception while processing transaction: revert');
};

contract('SensorsManager', function([owner, sensor, other]) {

  var sensorsManager;

  before("Deploy SensorsManager contract", async function() {
    sensorsManager = await SensorsManager.new();
  });


  it("should activate the sensor", async function() {
    await sensorsManager.activateSensor(sensor, {from: owner});

    (await sensorsManager.isSensorActive(sensor)).should.be.true;
  });


  it("should not activate by anyone other than the owner", async function() {
    await sensorsManager.activateSensor(sensor, {from: other}).shouldBeReverted();
  });


  it("should deactivate the sensor", async function() {
    (await sensorsManager.isSensorActive(sensor)).should.be.true;

    await sensorsManager.deactivateSensor(sensor, {from: owner});

    (await sensorsManager.isSensorActive(sensor)).should.be.false;
  });


  it("should not deactivate by anyone other than the owner", async function() {
    await sensorsManager.deactivateSensor(sensor, {from: other}).shouldBeReverted();
  });

});
