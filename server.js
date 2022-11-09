const express = require('express');
const app = express();

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: `Сообщение от ${req.body.email}`,
    text: `
    От: ${req.body.email}
    Номер телефона: ${req.body.number}
    Текст обращения: ${req.body.message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send('error');
    } else {
      res.send('success');
    }
  });
});
