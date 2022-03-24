import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { ErrorType } from "../../utils/types";

dotenv.config();

const user = process.env.GOOGLE_MAIL;
const pass = process.env.GOOGLE_MAIL_PASSWORD;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user,
    pass,
  },
});

const sendConfirmationEmail = (
  name: string,
  email: string,
  confirmationCode: string | undefined
) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Активация аккаунта",
      html: `<h1>Подтверждение email адреса</h1>
        <h2>Привет ${name}</h2>
        <p>Чтобы подтвердить почтовый адрес и активировать аккаунт, перейдите по ссылке:</p>
        <a href=https://bairro-alto.web.app/confirm/${confirmationCode}> Перейти</a> 
        </div>`,
    })
    .catch((error) => {
      (error as ErrorType).code = 500;
      error.message = "Error on send confirm email!";
      return error;
    });
};

export default sendConfirmationEmail;
