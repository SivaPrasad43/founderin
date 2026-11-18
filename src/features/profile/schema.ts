import { z } from "zod"
import { INVESTOR_TYPES, MEMBER_ROLES, SPECIALTIES } from "@/lib/constants"

const investorTypeValues = INVESTOR_TYPES.map((t) => t.value) as [string, ...string[]]
const specialtyValues = SPECIALTIES.map((s) => s.value) as [string, ...string[]]

export const roleFormSchema = z
  .object({
    role: z.enum(MEMBER_ROLES, { error: "Choose how you'll take part." }),
    investorType: z.enum(investorTypeValues).optional(),
    specialty: z.enum(specialtyValues).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.role === "investor" && !value.investorType) {
      ctx.addIssue({ code: "custom", path: ["investorType"], message: "Select investor type." })
    }
    if (value.role === "associate" && !value.specialty) {
      ctx.addIssue({ code: "custom", path: ["specialty"], message: "Select your expertise." })
    }
  })
  .transform((value) => ({
    role: value.role,
    investor_type: value.role === "investor" ? (value.investorType ?? null) : null,
    specialty: value.role === "associate" ? (value.specialty ?? null) : null,
  }))

export type RoleFormState = {
  ok: boolean
  message?: string
  fieldErrors?: Partial<Record<"role" | "investorType" | "specialty", string>>
}
