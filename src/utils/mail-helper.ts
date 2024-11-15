import { mailOptions, sendEmail } from "../services/smtp.service";

export class MailHelper {

  // Get in touch mail
  public getInTouch = async (params: any) => {
    const mailOptions: mailOptions = {
      to: process.env.ADMIN_EMAIL,
      subject: "Get In Touch",
      html: `<div>
      <p>Email: ${params.email}<p>
      <p>Phone: ${params.phone}<p>
      </div>`,
    };

    sendEmail(mailOptions);
  };

   // Bulk order discuss mail
   public bulkOrderDiscuss = async (params: any) => {
    const mailOptions: mailOptions = {
      to: process.env.ADMIN_EMAIL,
      subject: "Bulk order Discuss",
      html: `<div>
      <p>Message: ${params.message}<p>
      </div>`,
    };

    sendEmail(mailOptions);
  };

}
