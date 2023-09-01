const TelegramApi = require("node-telegram-bot-api");

const token = "6123823998:AAFeNGspj_NK7yjAkV7FeemlKMlI5xYanxw";

const bot = new TelegramApi(token,  { polling: true});

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
    await bot.sendSticker(chatId, 'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/MemeS1ick3r/429752.512.mp4');
    await bot.sendMessage(chatId, `Добро пожаловать в бот!`)
    }

    if (text === "/info" ) {
        await bot.sendMessage(chatId, `Тебя зовут ${msg.from.username}`)
    }
});