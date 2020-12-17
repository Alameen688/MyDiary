/* eslint no-underscore-dangle: 0 */
/* eslint no-plusplus: 0 */
import fs from 'fs';
import Mailgun from 'mailgun-js';
import Schedule from 'node-schedule';
import ClientController from './clientController';

class NotificationController extends ClientController {
  constructor() {
    super();
    this.mailingList = [];
    this.mailTemplate = `${__dirname}/../templates/daily-notification.html`;
    this.mailgun = new Mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });
    this.rule = new Schedule.RecurrenceRule();
  }

  getUsersToNotify() {
    return new Promise((resolve, reject) => {
      this._client.query('SELECT fullname, email FROM users WHERE notification=($1)', ['on'])
        .then((res) => {
          resolve(res.rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  composeMail(users) {
    return new Promise((resolve, reject) => {
      const limit = users.length;
      fs.readFile(this.mailTemplate, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          for (let index = 0; index < limit; index++) {
            const content = data.replace('{fullname}', users[index].fullname);
            this.mailingList.push({
              user: users[index].email,
              email: content,
            });
          }
        }

        resolve(this.mailingList);
      });
    });
  }

  sendMail(userEmail, subject, html) {
    return new Promise((resolve, reject) => {
      const mailData = {
        from: 'My Diary App <no-reply@mydiaryoxygen.com>',
        to: userEmail,
        subject,
        html,
        // 'o:testmode':true,
      };

      this.mailgun.messages().send(mailData, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  mailScheduler(job) {
    // everyday
    this.rule.dayOfWeek = [new Schedule.Range(0, 6)];
    // 6pm
    this.rule.hour = 18;
    // this.rule.minute = 30;
    Schedule.scheduleJob(this.rule, job);
  }

  notificationJob() {
    this.getUsersToNotify()
      .then(users => this.composeMail(users))
      .then((mailingListList) => {
        for (let index = 0; index < mailingListList.length; index++) {
          this.sendMail(mailingListList[index].user, 'I\'m interested. What happened today? - MyDiary', mailingListList[index].email)
            .then((res) => {
              console.log(res.message);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  dailyNotifier() {
    this.mailScheduler(() => {
      this.notificationJob();
    });
  }
}


export default NotificationController;
