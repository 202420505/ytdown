const express = require('express');
const app = express();
const downloadRouter = require('./api/download');

app.use(express.static('public'));
app.use(downloadRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
