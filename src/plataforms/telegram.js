const { Telegraf } = require('telegraf');
const { logSuccess, logError, setTelegramClient } = require('../utils');

require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

async function connectToTelegram() {
  try {
    bot.launch();

    setTelegramClient(bot);

    logSuccess('Bot do Telegram conectado com sucesso!');
  } catch (error) {
    logError('Erro ao conectar ao Telegram:', error);
  }
}

module.exports = { connectToTelegram };
