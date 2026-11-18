import "server-only"
import { z } from "zod"

/** Server-only env. Never import from a Client Component. */
const serverSchema = z.object({
  WHATSAPP_COMMUNITY_URL: z
    .url()
    .refine((url) => /^https:\/\/(chat\.whatsapp\.com|wa\.me|whatsapp\.com)\//.test(url), {
      message: "Must be a WhatsApp invite URL",
    }),
})

export function getServerEnv() {
  const parsed = serverSchema.safeParse({
    WHATSAPP_COMMUNITY_URL: process.env.WHATSAPP_COMMUNITY_URL,
  })
  if (!parsed.success) {
    const keys = [...new Set(parsed.error.issues.map((i) => i.path.join(".")))].join(", ")
    throw new Error(`Missing or invalid environment variables: ${keys}.`)
  }
  return parsed.data
}
