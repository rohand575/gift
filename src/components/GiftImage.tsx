import { useState } from 'react'

// Renders a gift's hero image with a graceful, on-brand gradient fallback so the
// UI stays beautiful even before real photos are dropped into public/images.
export default function GiftImage({
  src,
  alt,
  emoji,
  className = '',
}: {
  src: string
  alt: string
  emoji: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const url = import.meta.env.BASE_URL + src

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-cream via-blush
          to-champagne/50 ${className}`}
        aria-label={alt}
        role="img"
      >
        <span className="text-5xl opacity-70 drop-shadow-sm">{emoji}</span>
      </div>
    )
  }

  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
