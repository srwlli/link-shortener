// @Fn/server#startServer
// @A/server#POST:/api/shorten
// @A/server#GET:/:code

const express = require('express');
const path = require('path');
const { initStorage, saveUrl, getUrl } = require('./storage');
const { createShortUrl, expandShortUrl } = require('./urlService');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

initStorage();

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  try {
    const shortCode = createShortUrl(url);
    res.json({ shortUrl: `http://localhost:${PORT}/${shortCode}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/:code', (req, res) => {
  const longUrl = expandShortUrl(req.params.code);
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});