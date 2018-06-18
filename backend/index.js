'use strict';

const express = require('express');
const superagent = require('superagent');

require('dotenv').config();

const app = express();
const SPOTIFY_OAUTH_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1/me';

app.get('/oauth/spotify', (req, res) => {
  if (!req.query.code) {
    res.redirect(process.env.CLIENT_URL);
  } else {
    console.log('__3.1_3.2_CODE__', req.query.code);
    return superagent.post(SPOTIFY_OAUTH_URL)
      .type('form')
      .send({
        code: req.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/spotify`,
      })
      .then((tokenResponse) => {
        console.log('__3.3_ACCESS_TOKEN__', tokenResponse.body.access_token);
        if (!tokenResponse.body.access_token) {
          res.redirect(process.env.CLIENT_URL);
        }
        const accessToken = tokenResponse.body.access_token;
        return superagent.get(SPOTIFY_API_URL)
          .set('Authorization', `Bearer ${accessToken}`);
      })
      .then((spotifyResponse) => {
        console.log('__4_SPOTIFY_PROFILE_INFO', spotifyResponse.body);
        res.cookie('SPOTIFY_ID', spotifyResponse.body.id);
        res.redirect(process.env.CLIENT_URL);
      })
      .catch((err) => {
        console.log(err);
        res.redirect(`${process.env.CLIENT_URL}?error in OATH`);
      });
  }
});

app.listen(process.env.PORT, () => {
  console.log('_____SERVER UP ______', process.env.PORT);
});
