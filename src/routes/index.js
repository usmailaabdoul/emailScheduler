const router = require('express').Router();
const fs = require('fs');
const readline = require('readline');
const urlGoogle = require('../helpers/google')


router.get('/', async (req, res) => {
  const url = urlGoogle()
  console.log(url)
  res.render(`pages/index`, {
    url
  });
})

router.get('/terms&service', (req, res) => {
  res.render(`/pages/terms&service`);
})

module.exports = router;