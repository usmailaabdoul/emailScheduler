const router = require('express').Router();
const googleApi = require('../helpers/google')
const UserService = require('../services/users')

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

module.exports = router;