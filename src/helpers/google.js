require('dotenv').config();
const { google } = require('googleapis');
const UserService = require('../services/users');
const axios = require('axios');

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/userinfo.profile',
];

class GoogleApi {
  constructor() {
    this.url = '';
    this.auth;

    const client_id = process.env.CLIENT_ID
    const client_secret = process.env.CLIENT_SECRET
    const redirect_uri = process.env.REDIRRECT_URI

    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uri);
    this.auth = oAuth2Client;

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    this.url = authUrl;
  }

  getNewToken(code) {
    this.auth.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      this.auth.setCredentials(token);

      this.InitEmailandUser(token)
    });
  }

  getUrl() {
    return this.url
  }

  async InitEmailandUser(token) {
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token.access_token
        }
      }
      let res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', config)

      await UserService.createUser(token, res.data);

      this.sendEmail(token, res.data)
    } catch (error) {
      console.log(error)
    }
  }

  makeBody(to, subject, message) {
    const str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
      "MIME-Version: 1.0\n",
      "Content-Transfer-Encoding: 7bit\n",
      "to: ", to, "\n",
      "subject: ", subject, "\n\n",
      message
    ].join('');

    const encodedMail = Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
  }

  async sendEmail(token, user) {
    const client_id = process.env.CLIENT_ID
    const client_secret = process.env.CLIENT_SECRET
    const redirect_uri = process.env.REDIRRECT_URI

    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uri);

    oAuth2Client.credentials = token;

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const raw = this.makeBody('info@thebdma.com', 'Women in tech', 'WT04');

    try {
      let res = await gmail.users.messages.send({
        auth: oAuth2Client,
        userId: 'me',
        resource: {
          raw
        }
      });

      if (res.data.labelIds[0] === 'SENT') {
        UserService.updateUserCount(user.id).then(() => {return});
      }
      return
    } catch (error) {
      throw error;
    }
  }
}

const googleApi = new GoogleApi();

module.exports = googleApi;
