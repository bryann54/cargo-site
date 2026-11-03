import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '@/components/common/Logo'
import { navItems, serviceGroups } from '@/data/navigation'
import { useQuoteDialog } from '@/features/quote/QuoteDialogContext'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setOpen: setQuoteOpen } = useQuoteDialog()

  return (
    <header className="border-border bg-background/95 sticky top-0 z-40 border-b shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex min-w-0 items-center">
          <Logo className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition',
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" onClick={() => setQuoteOpen(true)}>
            Inquire
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="hover:border-primary hover:text-primary focus-visible:ring-primary border-border text-foreground rounded-xl border bg-white p-2.5 shadow-sm transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[min(88vw,360px)] overflow-y-auto p-0"
            >
              <div className="space-y-4 p-5">
                <Logo className="h-12 w-auto" />
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate the Tested &amp; Trusted website.
                </SheetDescription>
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-lg px-3 py-2 text-sm font-medium',
                          isActive
                            ? 'text-primary bg-secondary'
                            : 'text-foreground hover:bg-secondary',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="border-border border-t pt-4"
                >
                  {serviceGroups.map((group) => (
                    <AccordionItem key={group.title} value={group.title}>
                      <AccordionTrigger className="text-foreground text-left text-sm font-medium">
                        {group.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="text-muted-foreground space-y-2 text-sm">
                          {group.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                to={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="hover:text-primary"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button
                  className="w-full"
                  onClick={() => {
                    setQuoteOpen(true)
                    setMobileOpen(false)
                  }}
                >
                  Request a quote
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
