import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

export function InstagramIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function XIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...props}>
      <path d="M4 4 L20 20 M20 4 L4 20" />
    </svg>
  )
}

export function YoutubeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M11 10 L15 12 L11 14 Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedinIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="7.5" cy="8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M7.5 11 V17" />
      <path d="M12 17 V13.2 C12 11.5 14.5 11.3 14.5 13.2 V17" />
    </svg>
  )
}
