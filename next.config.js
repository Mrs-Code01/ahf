// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async headers() {
//     return [
//       {
//         source: "/:path*",
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value: [
//               "default-src 'self'",
//               // Scripts: Allow Next.js, Paystack
//               "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co https://checkout.paystack.com",
//               // Styles: Allow inline styles and Paystack
//               "style-src 'self' 'unsafe-inline' https://checkout.paystack.com https://paystack.com",
//               // Images: Allow all HTTPS images (for flexibility)
//               "img-src 'self' data: https: blob:",
//               // Fonts: Allow Paystack fonts
//               "font-src 'self' data: https://checkout.paystack.com https://paystack.com",
//               // Connections: Allow API calls to Paystack and Cloudinary
//               "connect-src 'self' https://api.paystack.co https://checkout.paystack.com https://standard.paystack.co https://res.cloudinary.com https://*.cloudinary.com",
//               // Frames: Allow YouTube and Paystack iframes
//               "frame-src 'self' https://checkout.paystack.com https://www.youtube.com https://www.youtube-nocookie.com",
//               // Media: Allow videos from Cloudinary
//               "media-src 'self' https://res.cloudinary.com https://*.cloudinary.com blob: data:",
//               // Object: Block plugins for security
//               "object-src 'none'",
//               // Frame ancestors: Only allow same origin
//               "frame-ancestors 'self'",
//             ].join("; "),
//           },
//         ],
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ FIX: Allow large file uploads (videos up to 200MB)
  experimental: {
    serverBodySizeLimit: "200mb",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co https://checkout.paystack.com",
              "style-src 'self' 'unsafe-inline' https://checkout.paystack.com https://paystack.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://checkout.paystack.com https://paystack.com",
              "connect-src 'self' https://formspree.io https://*.supabase.co wss://*.supabase.co https://api.paystack.co https://checkout.paystack.com https://standard.paystack.co https://res.cloudinary.com https://*.cloudinary.com",
              "frame-src 'self' https://checkout.paystack.com https://www.youtube.com https://www.youtube-nocookie.com",
              "media-src 'self' https://res.cloudinary.com https://*.cloudinary.com blob: data:",
              "object-src 'none'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
