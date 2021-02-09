const express = require('express');
const router = express.Router();
const config = require('../config');

router.get('/', (req, res) => {
  // delete the session
  const client_id = req.session.client_id;
  req.session.destroy();

  // end FusionAuth session
  res.redirect(`https://local.fusionauth.io/oauth2/logout?client_id=${client_id}`);
});

module.exports = router;

