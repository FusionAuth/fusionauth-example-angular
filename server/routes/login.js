const express = require('express');
const router = express.Router();
const config = require('../config');
const pkce = require('../helpers/pkce');

router.get('/', (req, res) => {
  // Generate and store the PKCE verifier
  req.session.verifier = pkce.generateVerifier();
  req.session.save(function(err) {
    if(!err) {
      console.log("here, no error");
    } else {
      console.log("here, error");
    }
  });

  // Generate the PKCE challenge
  const challenge = pkce.generateChallenge(req.session.verifier);

  res.redirect(`https://local.fusionauth.io/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256`);
});

module.exports = router;


