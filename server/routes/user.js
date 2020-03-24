const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

router.get('/', (req, res) => {
  res.send({
       "email" : "angularuser@example.com"
  });
});

module.exports = router;

