const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

const googleConfig = {
  clientId: '278281862588-mg5p1548due7nd59hj6r4h30f7anol4v.apps.googleusercontent.com',
  clientSecret: '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',
  redirect: "https://email-schedula.herokuapp.com/",
};

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/userinfo.email',
];

const TOKEN_PATH = 'token.json';

// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Gmail API.
//   authorize(JSON.parse(content), listLabels);
// });

// function authorize(credentials, callback) {
//   const { client_secret, client_id, redirect_uris } = credentials.web;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getNewToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// function getNewToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentiasls(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

function getUrl() {
  let authUrl = ''
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    let credentials = JSON.parse(content)
    console.log(content)
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        // console.log({authUrl})
        global_url = authUrl;
        return authUrl
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });

    console.log('anything')
  });

}

// function listLabels(auth) {
//   const gmail = google.gmail({ version: 'v1', auth });
//   gmail.users.labels.list({
//     userId: 'me',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const labels = res.data.labels;
//     if (labels.length) {
//       console.log('Labels:');
//       labels.forEach((label) => {
//         console.log(`- ${label.name}`);
//       });
//     } else {
//       console.log('No labels found.');
//     }
//   });
// }

module.exports = getUrl;