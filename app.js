var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'repcard122@gmail.com',
    pass: 'Vanshu123!!'
  }
});

var mailOptions = {
  from: 'repcard122@gmail.com',
  to: 'rian.sanghi2009@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});