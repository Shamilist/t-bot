const TelegramApi = require("node-telegram-bot-api");

const token = "6123823998:AAFeNGspj_NK7yjAkV7FeemlKMlI5xYanxw";

const bot = new TelegramApi(token,  { polling: true});

const chats = {};



const start = () => {
    bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие'},
    { command: '/info', description: 'Информация о пользователе'}
])

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
    await bot.sendSticker(chatId, 'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/MemeS1ick3r/429752.512.mp4');
    return bot.sendMessage(chatId, `Добро пожаловать в бот!`)
    }

    if (text === "/info" ) {
        return bot.sendMessage(chatId, `Тебя зовут ${msg.from.username}`)
    }

    if (text === "/game" ) {
        await bot.sendMessage(chatId, `Я загадал число от 0 до 9, ты должен угадать его :)`)
        const randomNumber = Math.floor(Math.random() * 10);
        chats[chatId] = randomNumber;
        return bot.sendMessage(chatId, 'Начинай отгадывать!')
    }

    return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй ещё раз!");
});
}

start();