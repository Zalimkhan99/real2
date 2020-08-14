process.env.NTBA_FIX_319 = 1;
//подключение модулей
var TelegramBot = require('node-telegram-bot-api');
const token = '1356849321:AAGYRYMGBGnnOzJCubrm2B3reK2qWZNXXV8';
const bot = new TelegramBot(token, {polling: true});
