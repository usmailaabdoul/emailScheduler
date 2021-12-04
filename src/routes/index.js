const router = require('express').Router();

const baseApi = '/api/v1';

router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})

router.get('/terms&service', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})
// router.use(baseApi, require('./users'));
module.exports = router;