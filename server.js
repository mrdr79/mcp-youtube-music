const express = require('express');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/play', async (req, res) => {
  const q = req.query.q;
  if (!q) {
    return res.json({ error: 'Missing query' });
  }

  try {
    const url = `https://www.youtube.com/watch?v=${q}`;
    const info = await ytdl.getInfo(url);

    const audio = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    res.json({
      title: info.videoDetails.title,
      mp3: audio.url
    });

  } catch (e) {
    res.json({ error: 'Cannot fetch video' });
  }
});

app.listen(PORT, () => {
  console.log('MCP YouTube running on port', PORT);
});
