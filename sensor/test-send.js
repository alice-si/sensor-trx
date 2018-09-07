const TelegramSender = require('./telegram-sender');

TelegramSender.sendMessage('Test first').then(function(res) {
    console.log("\x1b[32m%s\x1b[0m" ,"Cool");
    console.dir(res);
}, function (err) {
    console.log("\x1b[31m%s\x1b[0m" ,"'Not cool :(");
    console.log(err);
});