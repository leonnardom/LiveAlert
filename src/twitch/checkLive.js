const axios = require('axios');
require('dotenv').config();
const { logInfo, logError } = require('../utils/logger');

async function getTwitchAccessToken() {
  try {
    const response = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      null,
      {
        params: {
          client_id: process.env.TWITCH_CLIENT_ID,
          client_secret: process.env.TWITCH_CLIENT_SECRET,
          grant_type: 'client_credentials'
        }
      }
    );

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    logError(
      'Erro ao obter o token de acesso da Twitch:',
      error.response ? error.response.data : error
    );
    return null;
  }
}

async function checkTwitchLive() {
  try {
    const accessToken = await getTwitchAccessToken();

    if (!accessToken) {
      logError('Token de acesso não obtido.');
      return false;
    }

    const response = await axios.get('https://api.twitch.tv/helix/streams', {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        user_login: process.env.TWITCH_CHANNEL_NAME
      }
    });

    const stream = response.data.data[0];
    if (stream && stream.type === 'live') {
      logInfo(
        `O canal ${process.env.TWITCH_CHANNEL_NAME} está ao vivo na Twitch!`
      );

      return {
        id: stream.id,
        title: stream.title,
        thumbnail_url: stream.thumbnail_url
          .replace('{width}', '1280')
          .replace('{height}', '720'), 
        viewer_count: stream.viewer_count,
        started_at: stream.started_at,
        game_name: stream.game_name
      };
    } else {
      logInfo(`O canal ${process.env.TWITCH_CHANNEL_NAME} não está ao vivo.`);
      return false;
    }
  } catch (error) {
    logError(
      'Erro ao verificar live na Twitch:',
      error.response ? error.response.data : error
    );
    return false;
  }
}

module.exports = { checkTwitchLive };
