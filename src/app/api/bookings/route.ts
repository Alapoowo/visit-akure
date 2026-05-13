import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'bookings.json')

async function readBookings() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeBookings(bookings: unknown[]) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2))
}

export async function GET() {
  const bookings = await readBookings()
  return NextResponse.json(bookings)
}

export async function POST(req: NextRequest) {
  const booking = await req.json()
  const bookings = await readBookings()
  bookings.push(booking)
  await writeBookings(bookings)
  return NextResponse.json({ ok: true, id: booking.id }, { status: 201 })
}
