import { transporter } from "../config/nodemailer.js";

export const verifyEmail = async (user_email, user_name, link) => {
  // return transporter.verify((error, message) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("success");
  //   }
  // });
  return await transporter.sendMail({
    from: process.env.AUTH_MAIL,
    to: user_email,
    subject: "Confirm your email address",
    html: `
    <div>
    <p>Hey ${user_name}!</p>
    <p> Thank you for signing up for an account!</p>
    <p>To complete your signing up process, please click the link below </p>
    <a href="${link}"> Click to confirm</a>
    </div>
    `,
  });
};
