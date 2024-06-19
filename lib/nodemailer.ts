import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { rentalConfirmationTemplate } from "./templates/rental-confirmation";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMail = async (to: string, subject: string, body: string) => {
  try {
    transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export function compileRentalConfirmationTemplate(
  name: string,
  value: string,
  startDate: string,
  endDate: string,
  car: string,
) {
  const template = handlebars.compile(rentalConfirmationTemplate);

  const htmlBody = template({
    name: name,
    value: value,
    startDate: startDate,
    endDate: endDate,
    car: car,
  });
  return htmlBody;
}
