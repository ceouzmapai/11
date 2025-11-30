"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Trophy, User } from "lucide-react"

const navItems = [
  { href: "/", label: "Bosh sahifa", icon: Home },
  { href: "/tests", label: "Testlar", icon: BookOpen },
  { href: "/results", label: "Natijalar", icon: Trophy },
  { href: "/profile", label: "Profil", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  // Hide on quiz pages
  if (pathname.startsWith("/quiz/")) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "scale-110" : ""} transition-transform`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
