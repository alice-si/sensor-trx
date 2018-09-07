const TelegramBot = require('node-telegram-bot-api');
const Config = require('./config');
 
const bot = new TelegramBot(Config.botAccessToken, {polling: true});

let TelegramSender = {};

TelegramSender.sendMessage = msg => {
    return bot.sendMessage(Config.chatId, msg);
};

module.exports = TelegramSender;
