// import { NextResponse } from 'next/server';

// export async function GET() {
//     const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`;

//     try {
//         // Perform a HEAD request to check if the server is alive
//         const response = await fetch(backendUrl, { 
//             method: 'HEAD', 
//             cache: 'no-store',
//             signal: AbortSignal.timeout(5000) // 5 second timeout
//         });
        
//         if (!response.ok && response.status >= 500) {
//             throw new Error('Backend Down');
//         }

//         // If backend is healthy, redirect to the OAuth URL
//         return NextResponse.redirect(backendUrl);
//     } catch (error) {
//         console.error('Backend health check failed:', error);
        
//         // Redirect to login page with error parameter
//         const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
//         return NextResponse.redirect(new URL('/login?error=server_unavailable', baseUrl));
//     }
// }
