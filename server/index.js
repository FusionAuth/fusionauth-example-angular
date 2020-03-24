const express = require('express');
const session = require('express-session');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

// configure sessions
app.use(session(
  {
    secret: '1234567890',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      maxAge: 3600000
    }
  })
);

app.use('/user', require('./routes/user'));

app.listen(config.serverPort, () => console.log(`FusionAuth example app listening on port ${config.serverPort}.`));

