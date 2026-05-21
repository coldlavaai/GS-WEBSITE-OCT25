import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { appendToSheet } from '@/lib/googleSheets'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const NOTIFICATION_EMAIL = 'info@greenstarsolar.co.uk'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, postcode, message } = body

    if (!name || !email || !phone || !postcode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to Google Sheets
    try {
      const sheetsResult = await appendToSheet({ name, email, phone, postcode, message: message || '' })
      if (sheetsResult.success) {
        console.log('Form submission saved to Google Sheets')
      } else {
        console.error('Failed to save to Google Sheets:', sheetsResult.error)
      }
    } catch (sheetsError) {
      console.error('Error sending to Google Sheets:', sheetsError)
    }

    // Send email notification
    if (resend) {
      try {
        await resend.emails.send({
          from: 'GreenStar Solar <onboarding@resend.dev>',
          to: [NOTIFICATION_EMAIL],
          subject: 'New Contact Form Submission - GreenStar Solar',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #8cc63f 0%, #6fa832 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
              </div>
              <div style="background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0;">
                <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
                  <p style="margin: 10px 0;"><strong>Postcode:</strong> ${postcode}</p>
                </div>
                ${message ? `
                  <div style="background: white; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #333; margin-top: 0;">Message</h3>
                    <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                ` : ''}
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="color: #666; font-size: 14px; margin: 0;">
                    Submitted: ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
                  </p>
                </div>
              </div>
              <div style="background: #333; padding: 20px; text-align: center;">
                <p style="color: #999; margin: 0; font-size: 12px;">GreenStar Solar - Contact Form Notification</p>
              </div>
            </div>
          `,
        })
        console.log(`Email notification sent to: ${NOTIFICATION_EMAIL}`)
      } catch (emailError) {
        console.error('Error sending email:', emailError)
      }
    }

    return NextResponse.json({ success: true, message: 'Form submitted successfully' })

  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Failed to process form submission', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
