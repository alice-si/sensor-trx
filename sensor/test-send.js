const TelegramSender = require('./telegram-sender');
const Web3Utils = require('web3-utils');
const Config = require('./config');
const ethUtil = require('ethereumjs-util');

const frequency = 15; // seconds

setInterval(run, frequency * 1000);

function run() {
  const TIME = getTimestamp();
  const VALUE = getValue();

  const data = Web3Utils.soliditySha3(
    {
      type: 'uint8',
      value: VALUE
    },
    {
      type: 'uint256',
      value: TIME
    }
  );

  const signedData = getSignedData(VALUE, TIME);

  let messageJSON = JSON.stringify(signedData);
  console.log('Sending following message into Telegram channel:');
  console.log(messageJSON);

  TelegramSender.sendMessage(messageJSON).then(function(res) {
    console.log("\x1b[32m%s\x1b[0m" ,"Cool");
    console.dir(res);
  }, function (err) {
    console.log("\x1b[31m%s\x1b[0m" ,"'Not cool :(");
    console.log(err);
  });
}

function getSignedData(value, time) {
  const hash = Web3Utils.soliditySha3(
    {
      type: 'uint8',
      value: value
    },
    {
      type: 'uint256',
      value: time
    }
  );

  var privkey = new Buffer(Config.privateKey, 'hex');
  var data = ethUtil.hashPersonalMessage(ethUtil.toBuffer(hash));
  var vrs = ethUtil.ecsign(data, privkey);

  return {
    v: ethUtil.bufferToHex(vrs.v),
    r: ethUtil.bufferToHex(vrs.r),
    s: ethUtil.bufferToHex(vrs.s),
    msgHash: hash,
    value: value,
    time: time,
    signer: ethUtil.privateToAddress(privkey).toString('hex')
  };
}

function getTimestamp() {
  return (new Date()).valueOf();
}

function getValue() {
  return 100; // read from argv first arg
}