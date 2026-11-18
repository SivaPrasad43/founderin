import { z } from "zod"

/**
 * Public env — safe to read on server and client.
 * Next.js inlines NEXT_PUBLIC_* at build time, so each key must be
 * referenced explicitly (no dynamic `process.env[key]`).
 */
const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
})

const parsed = publicSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
})

if (!parsed.success) {
  const keys = [...new Set(parsed.error.issues.map((i) => i.path.join(".")))].join(", ")
  throw new Error(
    `Missing or invalid environment variables: ${keys}. ` +
      "Set them in .env.local (local) or Vercel → Project → Settings → Environment Variables, then redeploy.",
  )
}

export const publicEnv = parsed.data
