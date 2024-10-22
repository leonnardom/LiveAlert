const {
  getDiscordClient,
  getTelegramClient,
  getWhatsAppClient,
  logSuccess,
  logError,
  logInfo
} = require('../utils');

const { checkTwitchLive } = require('./checkLive');

const fs = require('fs');
const filePath = './notifiedLives.json';

let notifiedLives = [];

function loadNotifiedLives() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    notifiedLives = JSON.parse(data);
  } else {
    notifiedLives = [];
  }
}

function saveNotifiedLives() {
  fs.writeFileSync(filePath, JSON.stringify(notifiedLives, null, 2));
}

function saveLiveAsNotified(liveData) {
  notifiedLives.push(liveData);
  logInfo(`Live com ID ${liveData.id} salva como notificada.`);
  saveNotifiedLives();
}

function hasLiveBeenNotified(liveId) {
  return notifiedLives.some(live => live.id === liveId);
}

async function VerifyCronJob() {
  const liveData = await checkTwitchLive();

  if (liveData && !hasLiveBeenNotified(liveData.id)) {
    const message =
      `Canal ao Vivo na Twitch: ${liveData.title}\n` +
      `Visualizações: ${liveData.viewer_count}\n` +
      `Link da Thumbnail: ${liveData.thumbnail_url}\n` +
      `Jogo: ${liveData.game_name}`;

    await VerifyClients(message);

    saveLiveAsNotified({
      id: liveData.id,
      title: liveData.title,
      started_at: liveData.started_at,
      game_name: liveData.game_name,
      thumbnail_url: liveData.thumbnail_url,
      viewer_count: liveData.viewer_count
    });
  }
}

async function DiscordNotification(discord, message) {
  try {
    const channel = discord.channels.cache.get('1288942116659134474');

    if (channel) {
      await channel.send(message);
      logSuccess('Notificação enviada para o Discord!');
    } else {
      logError('Canal do Discord não encontrado!');
    }
  } catch (error) {
    logError('Erro ao enviar notificação para o Discord:', error);
  }
}

async function TelegramNotification(telegram, message) {
  try {
    const chatId = '-1002408986710';
    await telegram.telegram.sendMessage(chatId, message);

    logSuccess('Notificação enviada para o Telegram!');
  } catch (error) {
    logError(`Erro ao enviar notificação para o Telegram:`, error);
  }
}

async function WhatsAppNotification(whatsapp, message) {
  try {
    const groupId = '120363136963961263@g.us';

    await whatsapp.sendMessage(groupId, { text: message });

    logSuccess('Notificação enviada para o grupo do WhatsApp!');
  } catch (error) {
    logError('Erro ao enviar notificação para o grupo do WhatsApp:', error);
  }
}

async function VerifyClients(message) {
  const telegram = getTelegramClient();
  const discord = getDiscordClient();
  const whatsapp = getWhatsAppClient();

  if (telegram) await TelegramNotification(telegram, message);
  if (discord) await DiscordNotification(discord, message);
  if (whatsapp) await WhatsAppNotification(whatsapp, message);
}

loadNotifiedLives();

module.exports = { VerifyCronJob };
