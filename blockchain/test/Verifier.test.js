var Validator = artifacts.require("Validator");
const ethUtil = require('ethereumjs-util');
const web3Utils = require('web3-utils');

require("./test-setup");

contract('Validator', function([owner, signer]) {

  var validator;

  before(async function() {
    validator = await Validator.new()
  });


  it("address recovery", async function() {
    const message = web3Utils.soliditySha3(
      {
        type: 'uint8',
        value: 100
      },
      {
        type: 'uint256',
        value: 1000
      }
    );

    var signature = await web3.eth.sign(signer, message);

    var signatureData = ethUtil.fromRpcSig(signature);
    let v = ethUtil.bufferToHex(signatureData.v);
    let r = ethUtil.bufferToHex(signatureData.r);
    let s = ethUtil.bufferToHex(signatureData.s);


    const recoveredAddress = await validator.recoverAddress(message, v, r, s);
    recoveredAddress.should.be.equal(signer, 'The recovered address should match the signing address')
  });


  it("verify hash", async function() {
    const hash = web3Utils.soliditySha3(
      {
        type: 'uint8',
        value: 100
      },
      {
        type: 'uint256',
        value: 1000
      }
    );

    (await validator.verifyHash(hash, 100, 1000)).should.be.true;
  });

});
