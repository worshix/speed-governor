import nodemailer from 'nodemailer';

export async function sendSpeedAlert({ speed, latitude, longitude, to, from }: { speed: number, latitude: number, longitude: number, to: string, from: string }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from,
    to,
    subject: 'Speed Limit Exceeded!',
    text: `Alert! Speed limit exceeded.\nSpeed: ${speed} m/s\nLocation: https://maps.google.com/?q=${latitude},${longitude}`,
  };

  await transporter.sendMail(mailOptions);
}
