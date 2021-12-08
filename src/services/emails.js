const UserService = require('./users');
const GoogleApi = require('../helpers/google');

class EmailService {
  async sendEmails() {
    console.log('sending emails !!!')
    let users = await UserService.findUser();
    users.map((user) => {
      GoogleApi.sendEmail(user.token, user.user)
    })
  }
}

const emailService = new EmailService();

module.exports = emailService;