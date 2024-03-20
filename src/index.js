const express = require('express');
const { userRoute } = require('./routes');
const dotenv = require('dotenv');
dotenv.config();
const connect = require('./database');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoute);

app.get('/', (req, res) => {
  res.send('Response from ROOT ROUTER');
});

app.listen(PORT, async () => {
  await connect();
  console.log('Listening on port ' + PORT);
});
