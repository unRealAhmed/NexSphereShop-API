import EventEmitter from 'events'
import nodemailer from 'nodemailer'

const emailEventEmitter = new EventEmitter()

export class EmailService {
    private from: string

    constructor() {
        this.from =
            process.env.EMAIL_FROM ||
            'NexSphereShop Team <noreply@NexSphereShop.io>'
    }

    // Send email with event emitter
    send(subject: string, to: string, message?: string, html?: string): void {
        const mailOptions = {
            from: this.from,
            to,
            subject,
            text: message || '',
            html: html || '',
        }

        // Emit the 'sendEmail' event with mailOptions
        emailEventEmitter.emit('sendEmail', mailOptions)
    }

    // Welcome email
    sendWelcomeEmail(to: string, htmlContent: string): void {
        const subject = 'Welcome To NexSphereShop Family 🚀'

        this.send(subject, to, undefined, htmlContent)
    }

    // Password reset email
    sendPasswordResetEmail(
        to: string,
        resetURL: string,
        htmlContent: string,
    ): void {
        const subject = 'Password Reset Request'
        this.send(subject, to, htmlContent)
    }
}

// Listen for 'sendEmail' events
emailEventEmitter.on('sendEmail', async mailOptions => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    try {
        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully')
    } catch (error) {
        console.error('Error sending email:', error)
        // Log error for debugging but do not throw to the user
    }
})
