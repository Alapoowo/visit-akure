import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json()
    // In production: save to Supabase
    // await supabase.from('whatsapp_clicks').insert({ listing_id, title })
    console.log('WhatsApp click tracked:', title)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
