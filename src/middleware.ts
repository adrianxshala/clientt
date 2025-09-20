import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Check if environment variables are properly set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your-supabase-url-here' || supabaseAnonKey === 'your-anon-key-here') {
    console.warn('Supabase environment variables not configured. Skipping authentication middleware.')
    return res
  }

  try {
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard']
    const authRoutes = ['/auth/login', '/auth/signup']
    
    const isProtectedRoute = protectedRoutes.some(route => 
      req.nextUrl.pathname.startsWith(route)
    )
    const isAuthRoute = authRoutes.some(route => 
      req.nextUrl.pathname.startsWith(route)
    )

    // Redirect authenticated users away from auth pages
    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Redirect unauthenticated users from protected routes
    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return res
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}