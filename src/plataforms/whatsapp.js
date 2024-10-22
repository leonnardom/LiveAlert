const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require('@whiskeysockets/baileys');
const { logSuccess, logError, setWhatsAppClient } = require('../utils');

const qrcode = require('qrcode-terminal');
const path = require('path');

const authDirectoryPath = path.join(__dirname, 'auth_data');

async function connectToWhatsApp() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(authDirectoryPath);

    const sock = makeWASocket({
      auth: state
    });

    setWhatsAppClient(sock);

    sock.ev.on('connection.update', update => {
      const { connection, qr, lastDisconnect } = update;

      if (qr) {
        qrcode.generate(qr, { small: true });
      }

      if (connection === 'close') {
        const shouldReconnect =
          lastDisconnect?.error?.output?.statusCode !==
          DisconnectReason.loggedOut;
        console.log(
          'Conexão encerrada, tentando reconectar...',
          shouldReconnect
        );

        if (shouldReconnect) {
          connectToWhatsApp();
        } else {
          console.log('Conexão encerrada permanentemente.');
        }
      } else if (connection === 'open') {
        logSuccess('Bot do WhatsApp conectado com sucesso!');
      }
    });

    sock.ev.on('creds.update', saveCreds);
  } catch (error) {
    logError('Erro ao conectar ao WhatsApp:', error);
  }
}

module.exports = { connectToWhatsApp };
