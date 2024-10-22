const { logSuccess, logInfo, logError } = require('./logger');

const {
  setDiscordClient,
  getDiscordClient,
  getTelegramClient,
  setTelegramClient,
  setWhatsAppClient,
  getWhatsAppClient
} = require('./state');

module.exports = {
  logSuccess,
  logInfo,
  logError,
  setDiscordClient,
  getDiscordClient,
  getTelegramClient,
  setTelegramClient,
  setWhatsAppClient,
  getWhatsAppClient
};
