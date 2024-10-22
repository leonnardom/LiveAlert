const chalk = require('chalk');

function logSuccess(message) {
  console.log(chalk.green('[SUCCESS] ') + chalk.white(message));
}

function logInfo(message) {
  console.log(chalk.blue('[INFO] ') + chalk.white(message));
}

function logError(message, error) {
  console.log(chalk.red('[ERROR] ') + chalk.white(message), error);
}

module.exports = { logSuccess, logInfo, logError };
