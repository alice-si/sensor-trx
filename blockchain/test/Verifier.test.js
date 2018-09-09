var Verifier = artifacts.require("Verifier");
const ethUtil = require('ethereumjs-util');
const web3Utils = require('web3-utils');

require("./test-setup");

contract('Verifier', function([owner, signer]) {

  var verifier;

  before(async function() {
    verifier = await Verifier.new()
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


    var signature = await web3.eth.sign(owner, message);

    var signatureData = ethUtil.fromRpcSig(signature);
    let v = ethUtil.bufferToHex(signatureData.v);
    let r = ethUtil.bufferToHex(signatureData.r);
    let s = ethUtil.bufferToHex(signatureData.s);

    console.log("-------------- WEB3 SIGN -------------");
    console.log("Message: " + message);
    console.log("V: " + v);
    console.log("R: " + r);
    console.log("S: " + s);

    console.log("Signer: " + owner);


    const recoveredAddress = await verifier.recoverAddress(message, v, r, s);
    recoveredAddress.should.be.equal(owner, 'The recovered address should match the signing address')
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

    (await verifier.verifyHash(hash, 100, 1000)).should.be.true;
  });


  it("Signing with priv key example", async function() {

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

    var privkey = new Buffer('cf749dfd3f6b985ed17acbd528402f28ebfd0bf166da541470ec1876ee963a40', 'hex');
    var data = ethUtil.hashPersonalMessage(ethUtil.toBuffer(hash));
    var vrs = ethUtil.ecsign(data, privkey);


    console.log("-------------- ECSIGN -------------");

    ethUtil.privateToPublic(privkey).toString('hex');
    console.log("Message: " + hash);
    console.log("V: " + ethUtil.bufferToHex(vrs.v));
    console.log("R: " + ethUtil.bufferToHex(vrs.r));
    console.log("S: " + ethUtil.bufferToHex(vrs.s));
    console.log("Signer: " + ethUtil.privateToAddress(privkey).toString('hex'));


    var pubkey = ethUtil.ecrecover(data, vrs.v, vrs.r, vrs.s);
    pubkey.toString('hex').should.be.equal(ethUtil.privateToPublic(privkey).toString('hex'));
    ethUtil.publicToAddress(pubkey).toString('hex').should.be.equal(ethUtil.privateToAddress(privkey).toString('hex'));

  });



});
