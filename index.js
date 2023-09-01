const TelegramApi = require("node-telegram-bot-api");

const token = "6123823998:AAFeNGspj_NK7yjAkV7FeemlKMlI5xYanxw";

const bot = new TelegramApi(token,  { polling: true});

const chats = {};

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '1', callback_data: '1'}, { text: '2', callback_data: '2'}, { text: '3', callback_data: '3'}],
            [{ text: '4', callback_data: '4'}, { text: '5', callback_data: '5'}, { text: '6', callback_data: '6'}],
            [{ text: '7', callback_data: '7'}, { text: '8', callback_data: '8'}, { text: '9', callback_data: '9'}],
            [{ text: '0', callback_data: '0'}]

        ]
    })
}



const start = () => {
    bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие'},
    { command: '/info', description: 'Информация о пользователе'},
    { command: '/game', description: 'Запустить игру'}
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
        return bot.sendMessage(chatId, 'Начинай отгадывать!', gameOptions)
    }

    return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй ещё раз!");
});
}

bot.on("callback_query", msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    bot.sendMessage(chatId, `Ты выбрал цифру ${data}`);
})




start();