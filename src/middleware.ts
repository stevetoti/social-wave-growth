import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase isn't configured, block access to protected routes
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'undefined') {
    const protectedPaths = ['/admin', '/dashboard'];
    const isProtected = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );
    
    if (isProtected) {
      // Redirect to home with error message
      return NextResponse.redirect(new URL('/?error=auth_not_configured', request.url));
    }
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedPaths = ['/admin', '/dashboard'];
  const isProtectedRoute = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !session) {
    // Redirect to login page
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Optional: Admin-only routes (require specific role)
  const adminOnlyPaths = ['/admin'];
  const isAdminRoute = adminOnlyPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAdminRoute && session) {
    // Check if user has admin role (you can customize this check)
    const userEmail = session.user?.email;
    const adminEmails = [
      'steve@pacificwavedigital.com',
      'toti@pacificwavedigital.com',
      'toti.assistant@gmail.com',
    ];
    
    if (!adminEmails.includes(userEmail || '')) {
      // Not an admin - redirect to dashboard instead
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
  ],
};
