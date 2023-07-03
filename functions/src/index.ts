import * as functions from 'firebase-functions';
import { Client } from '@sendgrid/client';
import * as sgMail from '@sendgrid/mail';

export const email = functions
  .runWith({ secrets: ['API_KEY', 'EMAIL_FROM', 'EMAIL_TO'] })
  .https.onRequest((request, response) => {
    const headers = request.headers;
    const body = request.body;

    if (request.method !== 'POST') {
      response.status(405).send('Method Not Allowed');
      return;
    }

    if (
      headers['content-type'] !== 'application/x-www-form-urlencoded' ||
      headers['referer'] === undefined ||
      body['email'] === undefined ||
      body['message'] === undefined
    ) {
      response.status(400);
      response.send();
    } else {
      const apiKey = process.env.API_KEY as string;
      const emailFrom = process.env.EAMIL_FROM as string;
      const emailTo = process.env.EMAIL_TO as string;

      // Test setClient() method
      sgMail.setClient(new Client());

      // Test setApiKey() method
      sgMail.setApiKey(apiKey);

      // Test setSubstitutionWrappers() method
      sgMail.setSubstitutionWrappers('{{', '}}');

      const data = {
        from: emailFrom,
        to: emailTo,
        subject: 'Company reach out',
        text: 'This is a test email',
        html: `<h2>${body['email']}</h2><p>${body['message']}</p>`,
      };

      // Test send() method
      sgMail.send(data).then(
        (result) => {
          console.log('Sent email');
        },
        (err) => {
          console.error(err);
        }
      );
    }
  });
