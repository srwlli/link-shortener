// @Fn/storage#initStorage
// @Fn/storage#saveUrl
// @Fn/storage#getUrl

const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/urls.json');

function initStorage() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({}), 'utf-8');
  }
}

function saveUrl(longUrl, shortCode) {
  const data = JSON.parse(fs.readFileSync(dataPath));
  data[shortCode] = longUrl;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function getUrl(shortCode) {
  const data = JSON.parse(fs.readFileSync(dataPath));
  return data[shortCode];
}

module.exports = { initStorage, saveUrl, getUrl };