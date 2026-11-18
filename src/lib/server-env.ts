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
  return serverSchema.parse({
    WHATSAPP_COMMUNITY_URL: process.env.WHATSAPP_COMMUNITY_URL,
  })
}
