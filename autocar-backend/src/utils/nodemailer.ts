import nodemailer from "nodemailer";

const { EMAIL_SHOP, PASSWORD_SHOP } = process.env;

export const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: EMAIL_SHOP,
    pass: PASSWORD_SHOP,
  },
});
