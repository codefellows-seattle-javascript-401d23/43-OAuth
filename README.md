Lab 43: OAuth

## Overview 

This is basic OAuth setup with google. The frontend includes a link that when clicked promps google to initiate a GET request to our backend. 

## Technology & Dependencies

Javascript, Node

#### Dependencies
  - dotenv
  - express
  - nodemon
  - superagent
  - babel-eslint
  - babel-preset-env
  - babel-register
  - eslint
  - eslint-config-airbnb-base
  - eslint-plugin-import


## Getting Started

Create a .env file in the backend that includes:

```
GOOGLE_OAUTH_ID=<user-id>
GOOGLE_OAUTH_SECRET=<user-secret>
CLIENT_URL=http://localhost:8080
API_URL=http://localhost:3000
PORT=3000
```

Run nodemon by entering ```nodemon``` in the terminal window.

In a second terminal tab, enter ```live-server``` to open the frontend in the browser.
