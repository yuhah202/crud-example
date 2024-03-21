const express = require('express');
const { userRoute } = require('./routes');
const dotenv = require('dotenv');
dotenv.config();
const connect = require('./database');
// AUTHENTICATION MIDDLEWARE
const checkToken = require('./authentication');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(checkToken);
app.use(express.json());
app.use('/user', userRoute);

app.get('/', (req, res) => {
  res.send('Response from ROOT ROUTER');
});

app.listen(PORT, async () => {
  await connect();
  console.log('Listening on port ' + PORT);
});
