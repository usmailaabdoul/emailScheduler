require('dotenv').config();
const createServer = require('./src/server');
const setUpMongoose = require('./config/mongoose');
const nodemailer = require("nodemailer");
// let mongoUrl = 'mongodb://localhost/bookstore'
async function init() {
  // await setUpMongoose(mongoUrl);

  return createServer();
}

// const mailOptions = {
//   from: 'ismaelabdul77@gmail.com',
//   to: 'abdouldev77@gmail.com',
//   subject: 'Testing email service',
//   text: 'Hello, world testing email service!!!'
// }

// const transporter = nodemailer.createTransport({
//   port: 465,
//   secure: true,
//   auth: {
//     type: 'OAuth2',
//     user: 'ismaelabdul77@gmail.com',
//     serviceClient: '116648494181419549157',
//     privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxoR6FUKovDk+x\nsywZx5lFcyP8BMqHDTfuaokr+ZgOXSU/Qk4NqVHMbIj7dKBP+ToK6ArFzUpzPEcY\nNMT34D7vTvmwf+MJ5eWhj6eaxISkbPl7pCp3CLwyGHP7IXZRbb7oHOuC5b5N1xrI\nMTJfVXKwmnGDEmH2HCSMCOp2cFCl0tdZrGdW08Iizh7E1VTY/mwPBud52xN1cIvf\nDXeQQIjSsdy64IHwWY3Gz26IVH+E0V/Hfjazt0nNj85Yj1xBW+8t6njaJ1rOj9nL\nKDSW+Nl3Z9gN/auJEIcMbmQgQgoVnAKSVyKBMxI7d883m7GkIhqXH72r0CnM54W1\nlP21pw1HAgMBAAECggEAFsGZc2LeKqEevJlDsRnNHQSfO44xlBOxcq3bXPLg9BYi\ny3PnJADpJdNRyUUrtJMtSHBp0OV4AENcqFE6Wrcz2Ny5SE9Z+s6lGIma400B4T7E\nx35EonNQCOrxEN88lToGFx59XYupUbeZCsSiu2vrAY0Htc8JFcqNNBOAViQVcOjX\nYnSsWBUmbzHY8VaIhEU8uej0a72rRtx8Pl5vcWfNNNX+yfmHIcH0BkF86NO3AWpq\nD2PGL8zJoV8gB9K//k+ErnkdVOcWFWo86KLWToHG5bj1eHTs/OEslvrX/Itu70iv\nfjD6ZJD7vnJh6p6CrL1j+33gSdhNwXv+XY9rdwRxAQKBgQDVq7jnbc+9962bVdiB\n4bHa84nqjzqIu51EuBaSAvYiuTVg7XdZJXgPNib1+NUWBAv29nfoBqGdsPQqO/wx\n/aT2MmcMyi1zXlc9l3GyHC8/m4bBrP28NS+3WHeC56IRTeVRLkS05s1aTY8SeprW\nDQce4myNqkMk7SfUZK2lG8OJZwKBgQDU0ZADup/O3DVdZ+4CkWgZnBuXLaSYvEWV\nm/eSvnb1JHy9LOXkwk9zVo7DIZcT+Puy6jcLXZid5fIR6QWSY3CheXI7NzxIYi+D\nmY9FF2KfHlp3DWHTtYElzdZ4G52MZO9xZQiIBZ8nTHzKAG+PgiA0orb5nn+8vU1L\ny6p0lAmRIQKBgHjYuKlbuCUPEgdK1DsRNRBKsXQSMd7njZkyLMHEHwWgjooVhGzM\n/kxMKljvtUTQYRv6ZfK63WlcjZvddVOoy0XbV+Ep7+7SKrFRGCLOQgLNqbecaZ2q\nzyP5Sw6kh0sWLV5utrlB2F78grDG2w+5Ko/TK+Yrp/IYl3BOyM8bFsp9AoGBAIX5\nWykNzlbiR/ICYFJbiWY94RydzjWcqE2TvxoxLyAKFUDeR+dn765TOlJbDgmzv3gV\nfAt6o34baPWfdTN/yELO+nuOvTNwJCs7e3bqTtqOuDKkSQaHB8NtvmskL11XmWkQ\nSnue1l9eBl0AQzrblzyrhnbEMfP2U/e4QhlbrF4hAoGAEyziBGnu9GxHBDfAlExR\njmVuEDyGozeY73Y6SQRPhpefBjoR/1zk74uZ3mt2FJY0HNd5XG2t/M1gRDltw31k\nWtCj7LAgkU+CaGDNQojcAnnF8Ro5KfBmPWocb6KDg9o/08UaPOT6a0OIemzdeOH3\nQ8z7jID2E8K1Iz7DhwX/iqY=\n-----END PRIVATE KEY-----\n',
//     // accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
//     // expires: 1484314697598
//   }
// })

global.directory = __dirname;

init().then(server => {
  server.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
  })
})