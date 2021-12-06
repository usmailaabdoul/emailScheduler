const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const EmailService = require('./services/emails');

const routes = require('./routes');

function createApplication() {
  const app = express();
  
  app.set('view engine', 'ejs');
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.use('/', routes);

  // cron.schedule('00 8 * * *', () => {
  //   EmailService.sendEmail()
  // });
  // cron.schedule('*/1 * * * *', async () => {
  //   await EmailService.sendEmails()
  // });

  return app;
}

module.exports = createApplication;