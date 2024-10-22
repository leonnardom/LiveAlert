const { connectToDiscord } = require('./discord');
const { connectToTelegram } = require('./telegram');
const { connectToWhatsApp } = require('./whatsapp');

module.exports = {
 connectToWhatsApp,
  connectToTelegram,
  connectToDiscord
};
