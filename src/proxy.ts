import { NextRequest, NextResponse } from 'next/server'
import { userServices } from './services/user-services';
import { Roles } from './app/constant/roles';
 

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    let isAuthenticated = false;
    let userRole = null;


    const  data  = await userServices.getSession()
  

    if (data && data.user) {
        isAuthenticated = true;
        userRole = data?.user?.role;

    }

    if(!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if(pathname.startsWith('/admin') && userRole !== Roles.ADMIN) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if(pathname.startsWith('/seller') && userRole !== Roles.SELLER) {
        return NextResponse.redirect(new URL('/redirect/access-denied', request.url));
    }
    if(pathname.startsWith('/profile') && userRole !== Roles.USER) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if(pathname.startsWith('/orders') && userRole !== Roles.USER) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if(pathname.startsWith('/admin') && userRole === Roles.ADMIN) {
        return NextResponse.next();
    }
    if(pathname.startsWith('/seller') && userRole === Roles.SELLER) {
        return NextResponse.next();
    }
    // if(isAuthenticated && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }


  return NextResponse.next();
}
 
export const config = {
  matcher: ['/profile/:path*', '/orders/:path*', '/admin/:path*', '/seller/:path*'],
}