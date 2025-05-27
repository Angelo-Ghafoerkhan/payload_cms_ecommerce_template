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
  secure: true, // true for port 465; false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
} as nodemailer.TransportOptions)

/**
 * Sends an order confirmation email.
 * @param toEmail - The recipient email address.
 * @param orderType - Either 'subscription' or 'order'.
 */
async function sendOrderEmail(toEmail: string, orderType: 'subscription' | 'order') {
  const linkUrl =
    orderType === 'subscription'
      ? `${websiteUrl}/account?tab=subscriptions`
      : `${websiteUrl}/account/orders`
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
            ${orderType === 'subscription' ? 'Subscription Confirmed' : 'Order Confirmation'}
          </h1>
          <p style="font-size: 16px; color: ${emailSettings.colors.textSecondary};">
            Thank you for your ${orderType === 'subscription' ? 'subscription' : 'order'}!
            ${
              orderType === 'subscription'
                ? 'Your subscription is now active.'
                : 'Your order has been received and is being processed.'
            }
          </p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px;">
          <a href="${linkUrl}" style="background-color: ${emailSettings.colors.primary}; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View ${orderType === 'subscription' ? 'Subscription' : 'Order'} Details
          </a>
        </td>
      </tr>
    </table>
  `
  await transporter.sendMail({
    from: `${siteName} <${smtpUser}>`,
    to: toEmail,
    subject:
      orderType === 'subscription' ? 'Your Subscription is Active' : 'Your Order Confirmation',
    html: htmlEmail,
  })
}

export default sendOrderEmail
