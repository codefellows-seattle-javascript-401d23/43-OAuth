'use strict';

import express from 'express';
import superagent from 'superagent';

const app = express();
require('dotenv').config();

const FB_AUTH_URL = `https://graph.facebook.com/v3.0/oauth/access_token?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&client_secret=${process.env.FB_SECRET}&code=`;

const FB_USER_INFO = 'https://graph.facebook.com/v3.0/me?fields=id,name,email,birthday';

app.get('/login', (request, response) => {
  if (!request.query.code) {
    response.redirect(process.env.CLIENT_URL);
    return undefined;
  }
  return superagent.get(`${FB_AUTH_URL}${request.query.code}`)
    .type('form')
    .then((tokenResponse) => {
      const accessToken = tokenResponse.body.access_token;
      response.cookie('43-OAuth-Token', accessToken);
      return superagent.get(FB_USER_INFO)
        .set('Authorization', `Bearer ${accessToken}`);
    })
    .then((FBresponse) => {
      const { id, name, email } = JSON.parse(FBresponse.text);
      console.log({
        id,
        name,
        email,
      });
      response.redirect(process.env.CLIENT_URL);
    })
    .catch(err => console.error(err));
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

