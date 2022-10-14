const nodeoutlook = require('nodejs-nodemailer-outlook')
function sendemail(dest,message){
  nodeoutlook.sendEmail({
      auth: {
          user: process.env.outlookacc,
          pass: process.env.outlookpass
      },
      from: process.env.outlookacc,
      to: dest,
      subject: 'Hey you, awesome!',
      html: message,
      text: 'This is text version!',
      onError: (e) => console.log(e),
      onSuccess: (i) => console.log(i)
  }
  
  
  );
};

module.exports=sendemail;