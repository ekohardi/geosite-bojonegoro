import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'kedung123'
const ADMIN_COOKIE = 'guestbook_admin'

function isAuthenticated() {
  return cookies().then((store) => store.get(ADMIN_COOKIE)?.value === 'authenticated')
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (body?.username !== ADMIN_USERNAME || body?.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Username atau password salah.' }, { status: 401 })
  }

  const response = NextResponse.json({ authenticated: true })
  response.cookies.set(ADMIN_COOKIE, 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false })
  response.cookies.delete(ADMIN_COOKIE)
  return response
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    return NextResponse.json({ error: 'Koneksi basis data belum terkonfigurasi.' }, { status: 500 })
  }

  const supabase = createClient(url, key)
  const { data, error } = await supabase
    .from('guestbook_entries')
    .select('id, name, institution, phone, visit_date, purpose, home_address, information_source, feedback, message, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ entries: data ?? [] })
}
