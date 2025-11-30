"use client"

import Link from "next/link"
import { Trophy } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md safe-area-top">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Trophy className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">NUrTest</span>
        </Link>
      </div>
    </header>
  )
}
