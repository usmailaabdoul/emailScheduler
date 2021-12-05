require('dotenv').config();
const createServer = require('./src/server');
const setUpMongoose = require('./config/mongoose');
const nodemailer = require("nodemailer");

async function init() {
  // await setUpMongoose(mongoUrl);

  return createServer();
}


global.global_url = '';

init().then(server => {
  server.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
  })
})