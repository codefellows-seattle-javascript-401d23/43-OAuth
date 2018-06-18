'use strict';

import express from 'express';
import superagent from 'superagent';

const app = express();

require('dotenv').config();

const GOOGLE_OAUTH_URL = 'https://www.googleapis.com/oauth2/v4/token';
const OPEN_ID_URL = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

app.get('/oauth/google', (request, response) => {
  console.log('__STEP 3.1 - RECEIVING THE CODE__');
  if (!request.query.code) {
    response.redirect(process.env.CLIENT_URL);
  } else {
    console.log('__CODE__', request.query.code);

    console.log('__STEP 3.2 - SENDING THE CODE BACK__');
    return superagent.post(GOOGLE_OAUTH_URL)
      .type('form')
      .send({
        code: request.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_AUTH_ID,
        client_secret: process.env.GOOGLE_OAUTH_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/google`,
      })
      .then((tokenResponse) => {
        console.log('__STEP 3.3 - ACCESS TOKEN__');

        if (!tokenResponse.body.access_token) {
          response.redirect(process.env.CLIENT_URL);
        }
        const accessToken = tokenResponse.body.acces_token;

        return superagent.get(OPEN_ID_URL)
          .set('Authorization', `Bearer ${accessToken}`);
      })
      .then((openIDResponse) => {
        console.log('__STEP 4 - OPEN ID__');
        console.log(openIDResponse.body);


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
