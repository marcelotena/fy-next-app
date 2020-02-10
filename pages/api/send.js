const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { name, email, message, privacy } = req.body

    const content = {
        to: 'marcelotena@fastandyours.com',
        from: email,
        subject: `New Message From - ${email}`,
        text: message,
        html: `
            <p><strong>From: </strong>${name}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Message: </strong>${message}</p>
            <p><strong>Privacy Policy: </strong>${privacy}</p>
        `
    }

    try {
        await sgMail.send(content)
        res.status(200).send('Message sent successfully.')
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).send('Message not sent.')
    }
}