const state = {
  discordClient: null,
  telegramClient: null,
  whatsappClient: null
};

function setDiscordClient(client) {
  state.discordClient = client;
}

function getDiscordClient() {
  return state.discordClient;
}

function setTelegramClient(client) {
  state.telegramClient = client;
}

function getTelegramClient() {
  return state.telegramClient;
}

function setWhatsAppClient(client) {
  state.whatsappClient = client;
}

function getWhatsAppClient() {
  return state.whatsappClient;
}

module.exports = {
  setDiscordClient,
  getDiscordClient,
  setTelegramClient,
  getTelegramClient,
  setWhatsAppClient,
  getWhatsAppClient
};
