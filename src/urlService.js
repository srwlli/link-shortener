// @Fn/urlService#generateShortCode
// @Fn/urlService#validateUrl
// @Fn/urlService#createShortUrl
// @Fn/urlService#expandShortUrl

const { saveUrl, getUrl } = require('./storage');

function generateShortCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function createShortUrl(longUrl) {
  if (!validateUrl(longUrl)) {
    throw new Error('Invalid URL');
  }
  const code = generateShortCode();
  saveUrl(longUrl, code);
  return code;
}

function expandShortUrl(code) {
  return getUrl(code);
}

module.exports = { generateShortCode, validateUrl, createShortUrl, expandShortUrl };