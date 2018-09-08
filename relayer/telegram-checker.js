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
            EthProxy.saveInfo(data);
        } else {
            console.log('Data was not correctly signed: ' + data);
        }
    }
});

function checkMessage(data) {
    // This function will check if data is signed correctly
    // and will filter potential error messages (not signed transactions for example - but simple message)
    return true;
}


module.exports = TelegramChecker;