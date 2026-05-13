import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from('listings')
    .insert({
      business_name: body.businessName,
      category: body.category,
      address: body.address,
      description: body.description,
      phone: body.phone,
      whatsapp: body.whatsapp,
      email: body.email,
      website: body.website,
      submitter_name: body.submitterName,
      submitter_email: body.email,
      features: body.features ?? [],
      photos: body.photos ?? [],
      plan: body.plan,
      status: 'pending',
    })
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send email notification via Resend (only when API key is set)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && !resendKey.startsWith('re_your_')) {
    const planLabel = body.plan === 'featured' ? 'Featured (₦20,000/mo)' : body.plan === 'verified' ? 'Verified (₦5,000)' : 'Basic (Free)'
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Visit Akure <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL ?? 'admin@visitakure.com'],
        subject: `New Listing Submission: ${body.businessName}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#005F56">New Listing Submitted</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#666">Business</td><td style="padding:6px 0;font-weight:bold">${body.businessName}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Category</td><td style="padding:6px 0">${body.category}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Plan</td><td style="padding:6px 0">${planLabel}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Address</td><td style="padding:6px 0">${body.address}</td></tr>
              <tr><td style="padding:6px 0;color:#666">WhatsApp</td><td style="padding:6px 0">${body.whatsapp}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Submitted by</td><td style="padding:6px 0">${body.submitterName}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Features</td><td style="padding:6px 0">${(body.features ?? []).join(', ') || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Photos</td><td style="padding:6px 0">${(body.photos ?? []).length} uploaded</td></tr>
            </table>
            <div style="margin-top:24px">
              <a href="https://visitakure.com/admin/dashboard" style="background:#005F56;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">
                Review in Admin Dashboard →
              </a>
            </div>
          </div>
        `,
      }),
    }).catch(() => {})
  }

  return NextResponse.json({ success: true, id: data.id })
}
