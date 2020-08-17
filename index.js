process.env.NTBA_FIX_319 = 1;
//подключение модулей
const fetch = require("node-fetch");
const TelegramBot = require('node-telegram-bot-api');

const token = '1356849321:AAGYRYMGBGnnOzJCubrm2B3reK2qWZNXXV8'; // токен бота телеграм
const bot = new TelegramBot(token, {
	polling: true
});
//объявление переменных
var url = 'http://localhost/InfoBase/hs/Demo/List/'
var phone = '';
var promise;
var auth = false;
var newUrl = '';
var data = '';
//телеграм команды
let promiseStart = new Promise((resove, reject) => {
	bot.onText(/\/start/, msg => {

		bot.sendMessage(msg.chat.id, "Добро пожаловать! Подтвердите свою личность /auth ");

	})
})

let pormisePhone = new Promise((resove, reject) => {
	bot.onText(/\/auth/, msg => {
		bot.sendMessage(msg.chat.id, "Введите номер телефона:");
		//колбек берет данные с базы данных
		bot.on('message', msg => {

			phone = msg.text;
			if (phone.match(/^\d+$/)) {
				url = 'http://localhost/InfoBase/hs/Demo/List/' + phone;
				newUrl = url;

				promise = fetch(newUrl, {
						method: 'GET'
					})
					.then(promise => promise.json())
					.then(json => {
						auth = true;
						data = JSON.stringify(json, null, 2);
						bot.sendMessage(msg.chat.id, 'Чтоб узнать балнас введите /info ')

					})

					.catch(error => {


						auth = false;

						bot.sendMessage(msg.chat.id, 'Номер введен не правильно или не зарегестрирован');
						throw error;

					});
			}

		}) //конец колбека on message          
	}) //конец колбека onText(/start)
}) //конец promisePhone

let pormiseInfo = new Promise((resove, reject) => {

	bot.onText(/\/info/, msg => {

		if (data != '') {
			bot.sendMessage(msg.chat.id, data)
		} else bot.sendMessage(msg.chat.id, 'вы не авторизованы!')

	})


})
let pormiseExit = new Promise((resove, reject) => {

	bot.onText(/\/exit/, msg => {

		phone = '';
		auth = false;
		newUrl = '';
		data = '';
		bot.sendMessage(msg.chat.id, 'Всего доброго!')
	})

})