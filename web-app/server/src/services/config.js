const path = require('path');
const fs = require('fs');

const configPath = path.join(process.cwd(), './config/config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

module.exports = {
  config: config
}