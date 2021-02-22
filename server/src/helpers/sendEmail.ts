import nodemailer from "nodemailer"

export const sendEmail = async (email: string, url: string) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: "<foo@example.com>",
        to: email,
        subject: "test",
        text: "Test",
        html: `<a href="${url}">${url}</a>`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

