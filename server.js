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
    const ytsr = require('ytsr'); // Thêm thư viện tìm kiếm YouTube
const query = q;

const searchResults = await ytsr(query, { limit: 1 });
if (!searchResults.items || searchResults.items.length === 0) {
    return res.json({ error: 'No video found' });
}

const video = searchResults.items[0];
const videoUrl = video.url;

const info = await ytdl.getInfo(videoUrl, { requestOptions: { headers: { 'user-agent': 'Mozilla/5.0' } } });
const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

res.json({
    title: info.videoDetails.title,
    mp3: format.url
});


  } catch (e) {
  console.error(e);  // log chi tiết
  res.json({ error: 'Cannot fetch video', message: e.message });
}

});

app.listen(PORT, () => {
  console.log('MCP YouTube running on port', PORT);
});
