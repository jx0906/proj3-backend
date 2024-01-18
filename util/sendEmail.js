const nodemailer = require("nodemailer");
const dayjs = require("dayjs");

module.exports = {
  sendEmail,
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOptions = (obj) => {
  const { userName, dateTime, restaurant, pax } = obj.payload;
  const date = dayjs(dateTime).format("DD/MM/YYYY");
  const time = dayjs(dateTime).format("h:mm A");
  switch (obj.type) {
    // Reserveration Confirmation
    case "reservationCompleted":
      return {
        subject: "Reservation Completed",
        text:
          `Hello ${userName},\n\n` +
          `We are happy to inform you that your reservation is confirmed. Here are the details of your reservation:\n\n` +
          `- Reservation Date: ${date}\n` +
          `- Time: ${time}\n` +
          `- Restaurant: ${restaurant}\n` +
          `- Number of Guests: ${pax}\n\n` +
          `Enjoy your dining!\n\n` +
          `Best regards,\n` +
          `ChopeSeats`,
      };
    //   Reservation Changed
    case "reservationChanged":
      return {
        subject: "Reservation Updated",
        text:
          `Hello ${userName},\n\n` +
          `Your reservation has been successfully changed. Here are the details of your reservation:\n\n` +
          `- Reservation Date: ${date}\n` +
          `- Time: ${time}\n` +
          `- Restaurant: ${restaurant}\n` +
          `- Number of Guests: ${pax}\n\n` +
          `Enjoy your dining!\n\n` +
          `Best regards,\n` +
          `ChopeSeats`,
      };
    //   Reservation Cancelled
    case "reservationCancelled":
      return {
        subject: "Reservation Cancelled",
        text:
          `Hello ${userName},\n\n` +
          `Your reservation has been cancelled.\n\n` +
          `Best regards,\n` +
          `ChopeSeats`,
      };
  }
};

async function sendEmail(obj) {
  const mail = mailOptions(obj);
  const info = await transporter.sendMail({
    from: '"ChopeSeats" <noreply@chopeseats.com>',
    to: obj.payload.userEmail,
    subject: mail.subject,
    text: mail.text,
  });
  console.log(info);
}
