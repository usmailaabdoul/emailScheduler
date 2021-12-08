const router = require('express').Router();
const googleApi = require('../helpers/google')
const UserService = require('../services/users')
const EmailService = require('../services/emails');

router.get('/', async (req, res) => {
  const url = googleApi.getUrl();
  res.render(`pages/index`, {
    url,
  });
})

router.get('/terms&service', (req, res) => {
  res.render(`pages/terms&service`);
})

router.get('/statistics', async (req, res) => {
  const users = await UserService.findUser();
  const total = users.reduce((a, c) => a + c.count, 0);

  res.render(`pages/Statistics`, {users, total});
})

router.get('/success', (req, res) => {
  const query = req.query;
  googleApi.getNewToken(query.code);

  res.render(`pages/loginSuccess`, {
    googleApi,
  });
})

router.get('/send-emails', async (req, res) => {
  res.render(`pages/send-emails`);
})

router.get('/emails-sent', async (req, res) => {
  try {
    await EmailService.sendEmails();
    res.render(`pages/emails-sent`);
  } catch (error) {
    return res.status(400).json({message: 'Failed to send emails', error})
  }
})

module.exports = router;