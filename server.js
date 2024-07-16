const express = require('express');
const ytdl = require('ytdl-core');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Endpoint to download video
app.get('/download', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('YouTube video URL is required');
  }

  try {
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title.replace(/[<>:"/\\|?*]+/g, '');
    res.header('Content-Disposition', `attachment; filename="${videoTitle}.mp4"`);
    ytdl(url, { format: 'mp4' }).pipe(res);
  } catch (error) {
    res.status(500).send('An error occurred: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
