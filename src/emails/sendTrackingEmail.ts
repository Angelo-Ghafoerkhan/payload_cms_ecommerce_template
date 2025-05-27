import nodemailer from 'nodemailer'
import { siteName, websiteUrl, emailSettings } from '@payload-config'

// Configure nodemailer transporter.
const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: Number(smtpPort),
  secure: Number(smtpPort) === 465, // true for port 465; false for others
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
} as nodemailer.TransportOptions)

/**
 * Sends a tracking update email when trackingUrl is changed.
 * @param toEmail - The recipient's email address.
 * @param trackingUrl - The updated tracking URL.
 * @param orderRef - Optional order reference to include in the email.
 */
async function sendTrackingEmail(toEmail: string, trackingUrl: string, orderRef?: string) {
  const htmlEmail = `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif;">
      <tr>
        <td align="center" style="padding: 20px;">
          <img src="${websiteUrl}/logo.png" alt="Company Logo" style="max-width: 250px; width: 100%; height: auto;" />
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px;">
          <h1 style="font-size: 24px; color: ${emailSettings.colors.primary};">
            Your Order Has Shipped${orderRef ? `: ${orderRef}` : ''}
          </h1>
          <p style="font-size: 16px; color: ${emailSettings.colors.textSecondary};">
            You can track your order using the link below:
          </p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px;">
          <a href="${trackingUrl}" style="background-color: ${emailSettings.colors.primary}; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Track Your Order
          </a>
        </td>
      </tr>
    </table>
  `

  await transporter.sendMail({
    from: `${siteName} <${smtpUser}>`,
    to: toEmail,
    subject: `Your Order Has Shipped${orderRef ? `: ${orderRef}` : ''}`,
    html: htmlEmail,
  })
}

export default sendTrackingEmail
