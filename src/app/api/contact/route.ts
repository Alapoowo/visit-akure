import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, subject, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey || resendKey.startsWith('re_your_')) {
    return NextResponse.json({ success: true })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? 'Visit Akure <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL ?? 'admin@visitakure.com'],
      reply_to: email,
      subject: `Contact Form: ${subject ?? 'General Enquiry'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#005F56">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#666;width:120px">Name</td><td style="padding:6px 0;font-weight:bold">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">${email}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Subject</td><td style="padding:6px 0">${subject ?? 'General Enquiry'}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9f9f9;border-radius:8px">
            <p style="margin:0;color:#333;white-space:pre-wrap">${message}</p>
          </div>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
