const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { name, email, message, privacy, language, message_ok, message_error } = req.body

    let languageName = 'Español';
    if(language === 'en') {
        languageName = 'English';
    }

    let privacyChecked = 'User accepts privacy policy';
    if (privacy === false) {
        privacyChecked = 'User DOES NOT accept privacy policy';
    }

    const content = {
        to: 'marcelotena@fastandyours.com',
        from: email,
        subject: `New Message From - ${email}`,
        text: message,
        html: `
            <p><strong>Language: </strong>${languageName}</p>
            <p><strong>From: </strong>${name}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Message: </strong>${message}</p>
            <p><strong>Privacy Policy: </strong>${privacyChecked}</p>
        `
    }

    try {
        await sgMail.send(content)
        res.status(200).send(message_ok)
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).send(message_error)
    }
}