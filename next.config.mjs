/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      new URL(
        'https://pzyiopjmenomcskpiogi.supabase.co/storage/v1/object/public/cabin-images/**'
      ),
      new URL('https://lh3.googleusercontent.com/a/**'),
    ],
  },
}

export default nextConfig
