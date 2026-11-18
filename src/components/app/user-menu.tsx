"use client"

import Link from "next/link"
import { Home01Icon, Logout01Icon, UserIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@/components/icon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/features/auth/actions"
import { ROUTES } from "@/lib/routes"

export function UserMenu({
  name,
  email,
  avatarUrl,
  onboarded,
}: {
  name: string
  email: string | null
  avatarUrl: string | null
  onboarded: boolean
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="flex items-center gap-2.5 rounded-full py-1 pr-1 pl-1 transition-colors hover:bg-brand-canvas sm:pl-3"
      >
        <span className="hidden max-w-[160px] truncate text-[13px] font-medium text-brand-ink sm:block">
          {name}
        </span>
        <MemberAvatar name={name} avatarUrl={avatarUrl} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="grid gap-0.5 font-normal">
          <span className="truncate text-[13px] font-medium text-brand-ink">{name}</span>
          {email && <span className="truncate text-[12px] text-brand-muted">{email}</span>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onboarded && (
          <>
            <DropdownMenuItem asChild>
              <Link href={ROUTES.home}>
                <Icon icon={Home01Icon} size={16} />
                Member home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={ROUTES.profile}>
                <Icon icon={UserIcon} size={16} />
                Edit profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <form action={signOut}>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full">
              <Icon icon={Logout01Icon} size={16} />
              Sign out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function MemberAvatar({
  name,
  avatarUrl,
  className,
}: {
  name: string
  avatarUrl: string | null
  className?: string
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("")
  return (
    <Avatar className={className}>
      {avatarUrl && <AvatarImage src={avatarUrl} alt="" referrerPolicy="no-referrer" />}
      <AvatarFallback className="bg-brand-pale-blue text-[12px] font-medium text-brand-blue">
        {initials || "FI"}
      </AvatarFallback>
    </Avatar>
  )
}
