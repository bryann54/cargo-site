import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Ctx = { open: boolean; setOpen: (open: boolean) => void }
const QuoteDialogContext = createContext<Ctx | null>(null)

export function QuoteDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const value = useMemo(() => ({ open, setOpen }), [open])
  return (
    <QuoteDialogContext.Provider value={value}>
      {children}
    </QuoteDialogContext.Provider>
  )
}

export function useQuoteDialog() {
  const ctx = useContext(QuoteDialogContext)
  if (!ctx)
    throw new Error('useQuoteDialog must be used within QuoteDialogProvider')
  return ctx
}
