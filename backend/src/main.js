'use strict';

import express from 'express';
import superagent from 'superagent';

const app = express();

require('dotenv').config();

const FACEBOOK_OAUTH_URL = '';
const FACEBOOK_LOGIN_URL = '';

app.get('/oauth/facebook', (request, response) => {
  console.log('__STEP 3.1 - RECEIVING THE CODE__');
  if (!request.query.code) {
    response.redirect(process.env.CLIENT_URL);
  } else {
    console.log('__CODE__', request.query.code);

    console.log('__STEP 3.2 - SENDING THE CODE BACK__');
    return superagent.post(FACEBOOK_OAUTH_URL)
      .type('form')
      .send({
        code: request.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.FACEBOOK_AUTH_ID,
        client_secret: process.env.FACEBOOK_OAUTH_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/facebook?state=aabbcc112233`,
      })
      .then((tokenResponse) => {
        console.log('__STEP 3.3 - ACCESS TOKEN__');

        if (!tokenResponse.body.access_token) {
          response.redirect(process.env.CLIENT_URL);
        }
        const accessToken = tokenResponse.body.acces_token;

        return superagent.get(FACEBOOK_LOGIN_URL)
          .set('Authorization', `Bearer ${accessToken}`);
      })
      .then((facebookLoginResponse) => {
        console.log('__STEP 4 - OPEN ID__');
        console.log(facebookLoginResponse.body);


        response.cookie('LAB_43_TOKEN', 'Hello, I am the Lab 43 token.');
        response.redirect(process.env.CLIENT_URL);
      })
      .catch((error) => {
        console.log(error);
        response.redirect(`${process.env.CLIENT_URL}?error=oauth`);
      });
  }
  return undefined;
});

app.listen(process.env.PORT, () => {
  console.log('__SERVER_UP ON PORT ', process.env.PORT);
});
