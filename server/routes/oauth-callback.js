const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

router.get('/', (req, res) => {
  console.log("state");
  console.log(req.query.state);
  let client_id = "";
  let client_secret = "";
  let end_url = "";
  if (state === "2b7887a4-769b-4acc-9614-ef595b0232aa") {
    client_id = "2b7887a4-769b-4acc-9614-ef595b0232aa";
    client_secret = "G3qe0XjMQr2AEnCtPbd6GUfLf28YTORT0HI0oM9lhOo";
    end_url = "https://angular2.fusionauth.io";
  } else {
    client_id = "ca4c52d5-be47-442e-8487-3b4fde8af4bb";
    client_secret = "82mKgJ-q6UBDzcvmG-NNYJfijs_C-hZ5jAxF5osMG9M";
    end_url = "https://angular.fusionauth.io";
  }
  request(
    // POST request to /token endpoint
    {
      method: 'POST',
      uri: `https://local.fusionauth.io/oauth2/token`,
      form: {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': req.query.code,
        'code_verifier': req.session.verifier,
        'grant_type': 'authorization_code',
        'redirect_uri': config.redirectURI
      }
    },

    // callback
    (error, response, body) => {
      // save token to session
      req.session.token = JSON.parse(body).access_token;

      // redirect to the Angular app
      res.redirect(end_url);
    }
  );
});

module.exports = router;

