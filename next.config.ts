import type { NextConfig } from "next";

const canonicalOrigin = "https://donaldmayesministries.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://link.msgsndr.com https://*.msgsndr.com https://*.leadconnectorhq.com https://www.googletagmanager.com https://tagmanager.google.com",
  "style-src 'self' 'unsafe-inline' https://tagmanager.google.com https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' https:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://link.msgsndr.com https://*.msgsndr.com https://*.leadconnectorhq.com https://www.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://www.google.com",
  "frame-src 'self' https://api.leadconnectorhq.com https://*.leadconnectorhq.com https://www.googletagmanager.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  {
    key: "Permissions-Policy",
    value:
      'camera=(), microphone=(), geolocation=(), payment=(self "https://api.leadconnectorhq.com")',
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

if (process.env.NODE_ENV === "production") {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

function hostRedirects(fromHost: string) {
  return [
    {
      source: "/",
      has: [{ type: "host" as const, value: fromHost }],
      destination: `${canonicalOrigin}/`,
      permanent: true,
    },
    {
      source: "/:path*",
      has: [{ type: "host" as const, value: fromHost }],
      destination: `${canonicalOrigin}/:path*`,
      permanent: true,
    },
  ];
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3t3ozftmdmh3i.cloudfront.net",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      ...hostRedirects("www.donaldmayesministries.com"),
      ...hostRedirects("dmm-omega.vercel.app"),
    ];
  },
};

export default nextConfig;
