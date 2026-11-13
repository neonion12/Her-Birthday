export const config = {
  matcher: '/img/:path*', 
};

export default function middleware(request) {
  return new Response('403 Forbidden - Direct access is blocked', { status: 403 });
}
