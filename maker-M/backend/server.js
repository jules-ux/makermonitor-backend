const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Backend werkt!');
});

app.listen(5173, () => {
  console.log('Server draait op http://localhost:5173');
});
