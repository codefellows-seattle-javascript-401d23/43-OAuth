# Spotify OAuth Route
**Author**: Sarah Bixler
**Version**: 1.0.0 
## Overview
Clicking the link in index.html enables a user to login into Spotify.  
Once the user is logged in, spotify returns a code to `/oauth/spotify`

#### GET `/oauth/spotify`
receives a code from Spotify and returns it to Spotify's `/api/token` route.  

## Getting Started
- Fork the repo and run `npm i` to set up node modules
- Create an `.env` file and configure it with the following enviroment variables 
  ``` bash
  PORT=3000
  SPOTIFY_CLIENT_ID=<your client id>
  SPOTIFY_CLIENT_SECRET=<your client secret>
  CLIENT_URL=http://localhost:8080
  API_URL=http://localhost:3000
  ```
-  in **index.html** replace `SPOTIFY_CLIENT_ID` in the query string with your own 
- navigate to the front end folder and run live-server to serve the index page
- navigate to the back end folder and use `npm run start` to start the server
## Architecture
This app uses Node.js, express, superagent, and eslint with the airbnb style rules 
## Change Log
06-17-2018-- app has a functioning GET route to log in to Spotify using using OAuth.  the server returns profile information and saves the spotify id as a cookie called SPOTIFY_ID
