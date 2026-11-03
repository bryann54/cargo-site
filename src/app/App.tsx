import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { QuoteDialogProvider } from '@/features/quote/QuoteDialogContext'
import { SiteShell } from '@/app/SiteShell'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <QuoteDialogProvider>
      <BrowserRouter basename={basename}>
        <SiteShell />
        <Toaster position="top-center" richColors closeButton />
      </BrowserRouter>
    </QuoteDialogProvider>
  )
}
