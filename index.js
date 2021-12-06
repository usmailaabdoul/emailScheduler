require('dotenv').config();
const createServer = require('./src/server');
const setUpMongoose = require('./config/mongoose');

const mongoUrl = 'mongodb://localhost/emailService'

async function init() {
  await setUpMongoose(mongoUrl);

  return createServer();
}

init().then(server => {
  server.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
  })
})