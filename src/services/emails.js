const UserService = require('./users');
const GoogleApi = require('../helpers/google');

class EmailService {
  async sendEmails() {
    console.log('sending emails !!!')
    let users = await UserService.findUser();

    users.forEach(async (user) => {
      GoogleApi.sendEmail(user.token, user.user).then(() => {
        console.log('successfully sent email')
      }).catch((err) => {
        console.log("Error sending email: " + user.user.name)
        console.log("Error " + err)
      });
    })
  }
}

const emailService = new EmailService();

module.exports = emailService;