"use client"

import { useActionState, useEffect, useState } from "react"
import {
  ArrowUpRight01Icon,
  Briefcase01Icon,
  Loading03Icon,
  MoneyBag02Icon,
  Rocket01Icon,
  TeacherIcon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import { Icon } from "@/components/icon"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { RoleFormState } from "@/features/profile/schema"
import {
  INVESTOR_TYPES,
  MEMBER_ROLES,
  ROLE_META,
  SPECIALTIES,
  type MemberRole,
} from "@/lib/constants"
import { cn } from "@/lib/utils"

const ROLE_ICONS = {
  founder: Rocket01Icon,
  investor: MoneyBag02Icon,
  associate: Briefcase01Icon,
  mentor: TeacherIcon,
} satisfies Record<MemberRole, unknown>

type RoleFormProps = {
  action: (prev: RoleFormState, formData: FormData) => Promise<RoleFormState>
  submitLabel: string
  defaults?: {
    role?: MemberRole | null
    investorType?: string | null
    specialty?: string | null
  }
}

export function RoleForm({ action, submitLabel, defaults }: RoleFormProps) {
  const [state, formAction, pending] = useActionState(action, { ok: false })
  const [role, setRole] = useState<MemberRole | undefined>(defaults?.role ?? undefined)

  useEffect(() => {
    if (!state.message) return
    if (state.ok) toast.success(state.message)
    else toast.error(state.message)
  }, [state])

  return (
    <form action={formAction} className="grid gap-6" noValidate>
      <fieldset className="grid gap-3">
        <legend className="mb-3 text-[12px] font-medium text-[#494C50]">I am a…</legend>
        <RadioGroup
          name="role"
          value={role}
          onValueChange={(v) => setRole(v as MemberRole)}
          aria-invalid={Boolean(state.fieldErrors?.role)}
          aria-describedby={state.fieldErrors?.role ? "role-error" : undefined}
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
        >
          {MEMBER_ROLES.map((value) => {
            const meta = ROLE_META[value]
            return (
              <label
                key={value}
                htmlFor={`role-${value}`}
                className={cn(
                  "group relative flex cursor-pointer items-start gap-3 rounded-[4px] border border-input bg-white p-4 transition-colors",
                  "hover:border-brand-blue/50 has-[[data-state=checked]]:border-brand-blue has-[[data-state=checked]]:bg-brand-tint",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-orange",
                )}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-[4px] bg-brand-canvas text-brand-ink transition-colors group-has-[[data-state=checked]]:bg-brand-blue group-has-[[data-state=checked]]:text-white">
                  <Icon icon={ROLE_ICONS[value]} size={18} />
                </span>
                <span className="grid min-w-0 flex-1 gap-1">
                  <span className="text-[13px] font-medium text-brand-ink">{meta.label}</span>
                  <span className="text-[12px] leading-snug text-brand-muted">{meta.description}</span>
                </span>
                <RadioGroupItem id={`role-${value}`} value={value} className="mt-0.5 focus-visible:ring-0" />
              </label>
            )
          })}
        </RadioGroup>
        {state.fieldErrors?.role && (
          <p id="role-error" className="text-[12px] text-destructive">
            {state.fieldErrors.role}
          </p>
        )}
      </fieldset>

      {role === "investor" && (
        <DetailSelect
          name="investorType"
          label="I’m joining as"
          hint="Investor teams can eventually manage access under one organisation."
          options={INVESTOR_TYPES}
          defaultValue={defaults?.investorType ?? undefined}
          error={state.fieldErrors?.investorType}
        />
      )}

      {role === "associate" && (
        <DetailSelect
          name="specialty"
          label="Your primary expertise"
          hint="Your professional profile and portfolio can be built as FounderIn grows."
          options={SPECIALTIES}
          defaultValue={defaults?.specialty ?? undefined}
          error={state.fieldErrors?.specialty}
        />
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="group flex h-13 w-full items-center justify-between rounded-[3px] border border-brand-blue bg-brand-blue px-4 text-[13px] font-semibold text-white transition-[background-color,transform] hover:-translate-y-px hover:bg-brand-blue-dark active:translate-y-0 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 sm:w-auto sm:min-w-[260px] sm:gap-10"
      >
        <span>{pending ? "Saving…" : submitLabel}</span>
        <Icon
          icon={pending ? Loading03Icon : ArrowUpRight01Icon}
          size={20}
          className={pending ? "animate-spin" : "transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}
        />
      </button>

      <p role="status" aria-live="polite" className="sr-only">
        {state.message}
      </p>
    </form>
  )
}

function DetailSelect({
  name,
  label,
  hint,
  options,
  defaultValue,
  error,
}: {
  name: string
  label: string
  hint: string
  options: readonly { value: string; label: string }[]
  defaultValue?: string
  error?: string
}) {
  const id = `${name}-trigger`
  return (
    <div className="grid gap-2.5 border-l-2 border-brand-blue bg-[#F8F9FC] px-4 py-4 animate-in fade-in-0 slide-in-from-top-1">
      <Label htmlFor={id} className="text-[12px] font-medium text-[#494C50]">
        {label}
      </Label>
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger
          id={id}
          aria-invalid={Boolean(error)}
          className="h-11 w-full rounded-[3px] bg-white text-[13px] data-[size=default]:h-11"
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent position="popper">
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p className="text-[12px] text-destructive">{error}</p>
      ) : (
        <p className="text-[11px] leading-[1.55] text-brand-muted">{hint}</p>
      )}
    </div>
  )
}
