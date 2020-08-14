process.env.NTBA_FIX_319 = 1;
//подключение модулей
const fetch = require("node-fetch");
const TelegramBot = require('node-telegram-bot-api');
const token = '1356849321:AAGYRYMGBGnnOzJCubrm2B3reK2qWZNXXV8';
const bot = new TelegramBot(token, {polling: true});
var url = 'http://localhost/InfoBase/hs/Demo/List/'
var phone ='';
var promise;
var auth = false;
/*
var url = 'http://localhost/InfoBase/hs/Demo/List/';
var phone = '89286748487'
var promise =  fetch(url +phone ,    { method: 'GET' } )
.then( promise => promise.json() )
.then( json => console.log(json) )
.catch( error => console.error('Ввели не правлиьный номеп') );
console.log(promise);

*/
let promiseStart = new Promise((resove, reject)=>{
    bot.onText(/\/start/, msg=>{
        if (phone !="/start")
        bot.sendMessage(msg.chat.id, "Добро пожаловать! Введите номер телефона:");
        if (phone =="/start"){
            throw  bot.sendMessage(msg.chat.id , 'команда уже введена') 
        }

    })
})



let pormisePhone = new Promise((resove, reject)=>{
    bot.onText(/\/start/, msg=>{
        //проверка на коректность введеного номера
        if(phone==''&& phone != '/start'){ 
            //колбек берет данные с базы данных
            bot.on('message', msg=>{
                phone = msg.text
                url = 'http://localhost/InfoBase/hs/Demo/List/'+phone
                    //добавил условие чтоб не отправлялись подряд сообщения при отправки start
                if (phone !="/start"){
                 promise =  fetch(url ,    { method: 'GET' } )
                .then( promise => promise.json() )
                .then( json => {
                    auth = true;
                    console.log(auth)
                    bot.sendMessage(msg.chat.id ,'номер есть в базе')
                } )
                
               .catch( error =>{
                   bot.sendMessage(msg.chat.id , 'Ввели не правлиьный номер, повторите попытку') 
                   auth = false;
                   console.log(auth)
            });
                }

            })//конец колбека on message
        } //конец условия phone==''&& phone != '/start'     
    }) //конец колбека onText(/start)
}) //конец promisePhone

let promiseKeybord = new Promise((reseove, reject)=>{

    
})