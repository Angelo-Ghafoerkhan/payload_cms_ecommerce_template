import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { siteName } from '@payload-config'

// SETUP FORM
const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const mailTo = process.env.MAIL_TO

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: Number(smtpPort),
  secure: true, // Use true for port 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
} as nodemailer.TransportOptions)

export async function POST(request: Request) {
  const body = await request.json()

  try {
    await transporter.sendMail({
      from: `${siteName} Website - <${smtpUser}>`,
      to: mailTo,
      replyTo: body.email,
      subject: `${siteName} Website Submission`,
      html: `
        <h1>Contact From Website</h1>
        <p><strong>Name:</strong> ${body?.name}</p>
        <p><strong>Phone:</strong> ${body?.phone}</p>
        <h3>Message</h3>
        <p>${body.message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return new NextResponse(`Internal server error: ${error}`, {
      status: 500,
    })
  }
}
