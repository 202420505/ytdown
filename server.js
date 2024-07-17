const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('YouTube video URL is required');
  }

  try {
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title.replace(/[<>:"/\\|?*]+/g, '');
    res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.mp4"`);
    ytdl(url, { format: 'mp4' }).pipe(res);
  } catch (error) {
    res.status(500).send('An error occurred: ' + error.message);
  }
};
