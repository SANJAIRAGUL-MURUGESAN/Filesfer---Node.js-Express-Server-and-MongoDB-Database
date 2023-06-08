const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: "sanjairagul.m2020it@sece.ac.in",
      pass: "seceit2020"
   },
   tls: {
    rejectUnauthorized: false
}
});

const mailOptions = {
   from: "sanjairagul.m2020it@sece.ac.in",
   to: "rubinkumar.v2020cse@sece.ac.in",
   subject: "SECE - Placement Cell",
   text: "Hi Rubin Kumar V, This Mail is From Sri Eshwar College Placement Cell to Congradulate on your Placement in Eunimart whit 8 Lakh Salary Package. One again We Deliver our Delightful Congradulation and Wishing an Amazing Future.Good Luck!                   With Regards - SANJAI RAGUL M SECE PLACEMENTS DEVELOPER"

};

transporter.sendMail(mailOptions, function(error, info){
   if(error){
      console.log(error);
   }else{
      console.log("Email sent: " + info.response);
   }
});