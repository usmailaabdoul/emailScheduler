const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const EmailService = require('./services/emails');
const https = require('https');

const routes = require('./routes');

function createApplication() {
  const app = express();
  
  app.set('view engine', 'ejs');
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.use('/', routes);

  // cron.schedule('0 10 8 * * *', async () => {
  //   await EmailService.sendEmails()
  // });
  cron.schedule('0 30 8 * * *', async () => {
    await EmailService.sendEmails()
  });
  
  setInterval(() => {
    https.get('https://email-schedula.herokuapp.com/ping');
  }, 300000);

  return app;
}

module.exports = createApplication;