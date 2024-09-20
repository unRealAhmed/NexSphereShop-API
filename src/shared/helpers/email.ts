// src/helpers/email.ts
import nodemailer, { Transporter } from 'nodemailer'
import { InternalServerError } from '../errors/errors'

export class EmailService {
    private transporter: Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE, // e.g., Gmail
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
    }

    // Send password reset email
    async sendPasswordResetEmail(
        to: string,
        resetURL: string,
        htmlContent: string,
    ): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_FROM, // 'YourApp <noreply@yourapp.com>'
            to,
            subject: 'Password Reset Request',
            html: htmlContent,
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (error) {
            throw new InternalServerError('Failed to send email.') // Bubble up error to service
        }
    }
}
