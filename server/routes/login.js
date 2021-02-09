const express = require('express');
const router = express.Router();
const config = require('../config');
const pkce = require('../helpers/pkce');

router.get('/', (req, res) => {
  console.log(req.headers.referer);
  // Generate and store the PKCE verifier
  req.session.verifier = pkce.generateVerifier();
  state = '2b7887a4-769b-4acc-9614-ef595b0232aa';
  if (req.headers.referer == "https://angular.fusionauth.io/") {
    state = 'ca4c52d5-be47-442e-8487-3b4fde8af4bb';
  }
  req.session.client_id = state;

  // Generate the PKCE challenge
  const challenge = pkce.generateChallenge(req.session.verifier);

  res.redirect(`https://local.fusionauth.io/oauth2/authorize?client_id=${state}&redirect_uri=${config.redirectURI}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256&state=${state}`);
});

module.exports = router;


