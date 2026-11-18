"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ROUTES } from "@/lib/routes"
import { roleFormSchema, type RoleFormState } from "./schema"

function readRoleForm(formData: FormData) {
  return roleFormSchema.safeParse({
    role: formData.get("role") || undefined,
    investorType: formData.get("investorType") || undefined,
    specialty: formData.get("specialty") || undefined,
  })
}

async function persistRole(formData: FormData, { markOnboarded }: { markOnboarded: boolean }) {
  const parsed = readRoleForm(formData)
  if (!parsed.success) {
    const fieldErrors: NonNullable<RoleFormState["fieldErrors"]> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if ((key === "role" || key === "investorType" || key === "specialty") && !fieldErrors[key]) {
        fieldErrors[key] = issue.message
      }
    }
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors,
    } satisfies RoleFormState
  }

  // Re-check the session inside the action — never trust the client.
  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub
  if (!userId) redirect(ROUTES.landing)

  const update = markOnboarded
    ? { ...parsed.data, onboarded_at: new Date().toISOString() }
    : parsed.data

  const { error } = await supabase.from("profiles").update(update).eq("id", userId)
  if (error) {
    return { ok: false, message: "Could not save. Please try again." } satisfies RoleFormState
  }
  return null
}

export async function completeOnboarding(
  _prev: RoleFormState,
  formData: FormData,
): Promise<RoleFormState> {
  const failure = await persistRole(formData, { markOnboarded: true })
  if (failure) return failure
  revalidatePath("/", "layout")
  redirect(ROUTES.home)
}

export async function updateRole(_prev: RoleFormState, formData: FormData): Promise<RoleFormState> {
  const failure = await persistRole(formData, { markOnboarded: false })
  if (failure) return failure
  revalidatePath("/", "layout")
  return { ok: true, message: "Profile updated." }
}
