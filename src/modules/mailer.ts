import nodemailer from 'nodemailer';
import sendgridTransport from "nodemailer-sendgrid-transport"

export const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  })
);

