import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export function PublicStatusBar() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-t border-border bg-background">
      <div className="h-6 flex items-center justify-between px-3 text-xs">
        <span className="text-muted-foreground">MySIEM</span>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">&copy; 2026</span>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? 'Collapse footer' : 'Expand footer'}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="grid grid-cols-4 gap-4 px-4 py-3 text-xs text-muted-foreground border-t border-border">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Product</h4>
            <ul className="space-y-1">
              <li>Features</li>
              <li>Pricing</li>
              <li>Changelog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Community</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Company</h4>
            <ul className="space-y-1">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Legal</h4>
            <ul className="space-y-1">
              <li>Privacy</li>
              <li>Terms</li>
              <li>License</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
