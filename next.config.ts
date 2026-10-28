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
  "frame-src 'self' https://api.leadconnectorhq.com https://*.leadconnectorhq.com https://www.googletagmanager.com https://www.youtube-nocookie.com",
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
  { key: "Conte¶»§q«^