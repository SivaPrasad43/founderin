"use client"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { INFO_DIALOGS } from "@/lib/constants"

export function InfoDialog({
  kind,
  children,
}: {
  kind: keyof typeof INFO_DIALOGS
  children: React.ReactNode
}) {
  const content = INFO_DIALOGS[kind]
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="gap-0 rounded-[5px] p-8 sm:max-w-[500px] sm:p-11">
        <Eyebrow className="mb-4">{content.label}</Eyebrow>
        <DialogTitle className="mb-3.5 text-[30px] leading-[1.1] font-medium tracking-[-0.055em] sm:text-[36px]">
          {content.heading}
        </DialogTitle>
        <DialogDescription className="mb-6 text-sm leading-[1.75] text-brand-muted">
          {content.description}
        </DialogDescription>
        <DialogClose asChild>
          <Button variant="outline" className="h-10 w-fit rounded-[3px] bg-white px-4 text-xs">
            Back to access page
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
