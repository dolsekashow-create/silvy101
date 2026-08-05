import { createHmac, timingSafeEqual } from 'node:crypto'

export const ADMIN_COOKIE = 'silvy_admin'

export function sessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? ''
  const password = process.env.ADMIN_PASSWORD ?? ''
  return createHmac('sha256', secret).update(`admin:${password}`).digest('hex')
}

export function isValidSession(value: string | undefined) {
  if (!value) return false
  const expected = sessionToken()
  if (value.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected))
}

export function isValidPassword(input: string) {
  const password = process.env.ADMIN_PASSWORD ?? ''
  if (!password || input.length !== password.length) return false
  return timingSafeEqual(Buffer.from(input), Buffer.from(password))
}
