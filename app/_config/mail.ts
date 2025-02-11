import { createTransport, TransportOptions } from "nodemailer";

const transporterOptions = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
} as TransportOptions;

export async function sendEnquiry(options: {
  name: string;
  mail: string;
  message: string;
}) {
  //1. Create transporter
  const transporter = createTransport(transporterOptions);

  //2. Define the email options
  const mailOptions = {
    from: "info@lamastrategies.com",
    to: "snec20@gmail.com",
    subject: "Enquiry",
    html: `<div style='font-family:Verdana'>Name:${
      options.name
    }<br/>Mail:${options.mail}<br/><br/>${options.message.replaceAll("\r\n", "<br/>")}`,
  };

  //3. Actually send the email
  const res = await transporter.sendMail(mailOptions);

  return res.response;
}
