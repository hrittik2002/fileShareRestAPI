import nodemailer from 'nodemailer';

export const sendEmailService = async({ from, to,  subject , text , html })=>{
    // SMTP configuration
    let transpoter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure : false,
        auth : {
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASS
        }
    });

    // send mail
    let info = await transpoter.sendMail({
        from : `fileShare <${from}>`,
        to : to,
        subject : subject,
        text : text,
        html : html
    })
}