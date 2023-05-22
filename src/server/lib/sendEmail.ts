import chalk from "chalk";
import getDebug from "debug";
import dotenv from "dotenv";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport.js";
import { ErrorType, ISendMailOptions } from "../../utils/types.js";

dotenv.config();
const debug = getDebug("bairro:sendEmail");
debug.enabled = true;
const { OAuth2 } = google.auth;

const user = process.env.GOOGLE_MAIL;
const clientSecret = process.env.GOOGLE_MAIL_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_MAIL_REFRESH_TOKEN;
const clientId = process.env.GOOGLE_MAIL_CLIENT_ID;
const oauthplaygroundURL = process.env.GOOGLE_OAUTHPLAYGROUND_URL;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(clientId, clientSecret, oauthplaygroundURL);
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const accessToken: string | PromiseLike<string> = await new Promise(
    (resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err || !token) {
          debug(chalk.red("Get access token error: ", err));
          reject();
        } else if (token) {
          debug(chalk.green("Get access token success"));
          resolve(token);
        }
      });
    }
  );

  const transportOptions: SMTPTransport.Options = {
    service: "Gmail",
    auth: {
      type: "OAuth2",
      user,
      accessToken,
      clientId,
      clientSecret,
      refreshToken,
    },
  };

  return nodemailer.createTransport(transportOptions);
};

const sendEmail = async (
  email: string,
  mailSubject: string,
  mailText: string,
  mailTemplate: string,
  mailContext: object
) => {
  const sendMailOptions: ISendMailOptions = {
    from: user,
    to: email,
    subject: mailSubject,
    text: mailText,
    template: mailTemplate,
    context: mailContext,
  };
  const emailTransporter = await createTransporter();
  try {
    await emailTransporter.sendMail(sendMailOptions);
    debug(chalk.green("Email sent!"));
  } catch (error) {
    (error as ErrorType).code = 500;
    (error as ErrorType).message = "Error on send email!";
    debug(chalk.red("Error on send email: ", error));
    return error;
  }
};

export default sendEmail;
