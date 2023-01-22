import * as functions from 'firebase-functions';
import { NodeMailgun } from 'ts-mailgun';

export const email = functions
  .runWith({ secrets: ['API_KEY', 'DOMAIN', 'EMAIL_TO'] })
  .https.onRequest((request, response) => {
    const headers = request.headers;
    const body = request.body;

    if (
      request.method !== 'POST' ||
      headers['content-type'] !== 'application/x-www-form-urlencoded' ||
      headers['referer'] === undefined ||
      body['email'] === undefined ||
      body['message'] === undefined ||
      body['repository'] === undefined
    ) {
      response.status(400);
      response.send();
    } else {
      const mailer = new NodeMailgun();

      mailer.apiKey = process.env.API_KEY as string;
      mailer.domain = process.env.DOMAIN as string;
      mailer.fromEmail = `company-site@${mailer.domain}`;
      mailer.fromTitle = 'Company site';
      const mailTo = process.env.EMAIL_TO as string;

      mailer.init();

      mailer
        .send(mailTo, 'Contact Us', `${body['email']}\n${body['message']}`)
        .then((result) => {
          console.log('Done', result);
          response.redirect(`${headers['referer']}${body['repository']}/sent.html`);
        })
        .catch((error) => {
          console.error('Error: ', error);
          response.redirect(`${headers['referer']}${body['repository']}/error.html`);
        });
    }
  });
