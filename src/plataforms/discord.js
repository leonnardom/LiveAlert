const { Client, GatewayIntentBits } = require('discord.js');
const { logSuccess, setDiscordClient } = require('../utils');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

async function connectToDiscord() {
  try {
    client.once('ready', () => {
      logSuccess(`Bot do Discord conectado como ${client.user.tag}`);

      setDiscordClient(client);
    });

    await client.login(process.env.DISCORD_BOT_TOKEN);
  } catch (error) {
    logError('Erro ao conectar ao Discord:', error);
  }
}

module.exports = { connectToDiscord };
