const UserService = require('./users');
const GoogleApi = require('../helpers/google');

class EmailService {
  async sendEmails() {
    console.log('sending emails !!!')
    let users = await UserService.findUser();

    // users.forEach(async (user) => {
      GoogleApi.sendEmail(users[0].token, users[0].user).then(() => {
        console.log('successfully sent email')
      }).catch((err) => {
        console.log("Error sending email: " + users[0].user.name)
        console.log("Error" + err)
      });
    // })
  }
}

const emailService = new EmailService();

module.exports = emailService;