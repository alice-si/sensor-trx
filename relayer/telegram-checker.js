const TelegramBot = require('node-telegram-bot-api');
const Config = require('./config');
const EthProxy = require('./eth-proxy');

let TelegramChecker = {};

const bot = new TelegramBot(Config.botAccessToken, {polling: true});

bot.on('channel_post', (msg) => {
    if (msg.chat.title = Config.channelTitle) {
        const data = msg.text;
        if (checkMessage(data)) {
            console.log('Saving data in blockchain...');
            let obj = JSON.parse(data);
            // EthProxy.saveInfo(obj).then(function (res) {
          EthProxy.processData(obj).then(function (res) {
                console.log('Successfully saved: ');
                console.log(res);
            }, function (err) {
                console.log('Some error occured: ' + err);
            });
        } else {
            console.log('Data was not correct :( Skipping... ' + data);
        }
    }
});

function checkMessage(data) {
    try {
        let obj = JSON.parse(data);
        console.log(obj);
        return Boolean(obj.value && obj.time && obj.msgHash && obj.v && obj.r && obj.s); // Kinf of checking if fields exist and are not empty
    } catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = TelegramChecker;