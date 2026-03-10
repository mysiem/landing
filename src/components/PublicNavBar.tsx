import { Home, BookOpen, Newspaper, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  icon: LucideIcon
  label: string
  href: string
  active?: boolean
}

export function PublicNavBar() {
  const topItems: NavItem[] = [
    { icon: Home, label: 'Home', href: '/', active: true },
    { icon: BookOpen, label: 'Docs', href: '#' },
    { icon: Newspaper, label: 'Blog', href: '#' },
  ]

  return (
    <nav className="row-span-2 flex flex-col w-full h-full border-r border-border bg-background" aria-label="Public navigation">
      {topItems.map((item) => {
        const Icon = item.icon
        return (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={cn(
              'flex items-center justify-center w-full h-12 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors',
              item.active && 'bg-accent text-accent-foreground border-l-2 border-primary'
            )}
          >
            <Icon className="size-5" />
          </a>
        )
      })}

      <div className="mt-auto">
        <a
          href="/login"
          aria-label="Login"
          className="flex items-center justify-center w-full h-12 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <LogIn className="size-5" />
        </a>
      </div>
    </nav>
  )
}
