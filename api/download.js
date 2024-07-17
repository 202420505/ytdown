const express = require('express');
const fyda = require('fyda');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/api/download', async (req, res) => {
  const url = req.query.url;
  const format = req.query.format;

  if (!url || !format) {
    return res.status(400).send('YouTube video URL and format are required');
  }

  const videoId = new URL(url).searchParams.get('v');
  const filePath = path.join(__dirname, `${videoId}.${format}`);

  try {
    if (format === 'mp3') {
      await fyda.downloadMp3(url, __dirname, `${videoId}.mp3`);
    } else if (format === 'mp4') {
      await fyda.downloadMp4(url, __dirname, `${videoId}.mp4`);
    } else {
      return res.status(400).send('Invalid format. Use "mp3" or "mp4".');
    }

    res.download(filePath, (err) => {
      if (err) {
        res.status(500).send('An error occurred: ' + err.message);
      } else {
        fs.unlinkSync(filePath); // Delete the file after download
      }
    });
  } catch (error) {
    res.status(500).send('An error occurred: ' + error.message);
  }
});

module.exports = app;
