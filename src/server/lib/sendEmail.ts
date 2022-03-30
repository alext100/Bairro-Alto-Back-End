import nodemailer from "nodemailer";
import dotenv from "dotenv";
import nodemailerhbs from "nodemailer-express-handlebars";
import { ErrorType, ISendMailOptions } from "../../utils/types.js";

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

transport.use(
  "compile",
  nodemailerhbs({
    viewEngine: {
      extname: ".handlebars",
      partialsDir: "src/views/emails/partials",
      layoutsDir: "src/views/emails/layouts",
      defaultLayout: "",
    },
    viewPath: "src/views/emails/",
    extName: ".handlebars",
  })
);

const sendEmail = (
  email: string,
  mailSubject: string,
  mailText: string,
  mailTemplate: string,
  mailContext: object
) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: mailSubject,
      text: mailText,
      template: mailTemplate,
      context: mailContext,
    } as ISendMailOptions)
    .catch((error) => {
      (error as ErrorType).code = 500;
      error.message = "Error on send email!";
      return error;
    });
};

export default sendEmail;

/* import path, { resolve } from "path";
  import { fileURLToPath } from "url"; */
/* const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const viewPath = resolve(__dirname, "..", "..", "views", "emails");
  
   transport.use(
    "compile",
    nodemailerhbs({
      viewEngine: {
        extname: ".handlebars",
        partialsDir: resolve(viewPath, "partials"),
        layoutsDir: resolve(viewPath, "layouts"),
        defaultLayout: "",
      },
      viewPath,
      extName: ".handlebars",
    })
  ); */
