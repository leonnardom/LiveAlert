const { connectToDiscord, connectToTelegram, connectToWhatsApp } = require('./src/plataforms');

const { VerifyCronJob } = require('./src/twitch/cronJob');
const { getWhatsAppClient } = require('./src/utils');

require('dotenv').config();

(async () => {
  await connectToDiscord();
  await connectToTelegram();
  await connectToWhatsApp()


  await sleep(5000)

  // const whatsapp = await getWhatsAppClient();

  // if (!whatsapp?.user) {
  //   console.log('Bot do WhatsApp não está conectado.');
  //   return;
  // }

  // try {
  //   const groups = await whatsapp.groupFetchAllParticipating();
  //   console.log('Grupos que o bot está participando:');
  //   Object.entries(groups).forEach(([id, group]) => {
  //     console.log(`ID do grupo: ${id}, Nome: ${group.subject}`);
  //   });
  // } catch (error) {
  //   console.log('Erro ao listar os grupos do WhatsApp:', error);
  // }

  await VerifyCronJob();

  // cron.schedule('*/1 * * * *', async () => {
  //   logInfo('Verificando se o canal está ao vivo...');

  //   try {
  //     await checkTwitchLive();

  //     logSuccess('Verificação de live completada com sucesso.');
  //   } catch (error) {
  //     logError('Erro ao verificar live:', error);
  //   }
  // });

  // logInfo(
  //   'Cronjob de verificação de live configurado para rodar a cada 10 minutos.'
  // );
})();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
