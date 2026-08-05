import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, isValidPassword, sessionToken } from '@/lib/admin-session'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const form = await request.formData()
  const password = String(form.get('password') ?? '')

  if (!isValidPassword(password)) {
    return NextResponse.redirect(new URL('/admin/login?error=1', request.url), { status: 303 })
  }

  const response = NextResponse.redirect(new URL('/admin', request.url), { status: 303 })
  response.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  })
  return response
}
