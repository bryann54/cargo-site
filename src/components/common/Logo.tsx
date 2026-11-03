import type { ImgHTMLAttributes } from 'react'
import horizontal from '@/assets/brand/logo-horizontal.svg'
import reversed from '@/assets/brand/logo-reversed.svg'
import symbol from '@/assets/brand/logo-symbol.svg'
import stacked from '@/assets/brand/logo-stacked.svg'

type LogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  variant?: 'horizontal' | 'stacked' | 'symbol'
  tone?: 'dark' | 'light'
  alt?: string
}

const logoAssets = {
  horizontal: { dark: horizontal, light: reversed },
  stacked: { dark: stacked, light: stacked },
  symbol: { dark: symbol, light: symbol },
}

export function Logo({
  variant = 'horizontal',
  tone = 'dark',
  alt = 'Tested & Trusted Clearing & Forwarding',
  className,
  ...props
}: LogoProps) {
  return (
    <img
      src={logoAssets[variant][tone]}
      alt={alt}
      className={className}
      width={variant === 'symbol' ? 96 : variant === 'stacked' ? 260 : 456}
      height={variant === 'symbol' ? 96 : variant === 'stacked' ? 242 : 88}
      {...props}
    />
  )
}
