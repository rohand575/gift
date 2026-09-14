import { site } from '../config/site'

// Magical, non-numeric progress indicator (PRD §33): ✦ Discover → Choose → Make It Yours ✦
export default function Progress({ step }: { step: 0 | 1 | 2 }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-ink-soft">
      <span className="text-gold">✦</span>
      {site.progress.map((label, i) => (
        <span key={label} className="flex items-center gap-2">
          <span
            className={
              i === step
                ? 'font-medium text-gold'
                : i < step
                  ? 'text-ink-soft'
                  : 'text-ink-soft/40'
            }
          >
            {label.toUpperCase()}
          </span>
          {i < site.progress.length - 1 && <span className="text-ink-soft/30">→</span>}
        </span>
      ))}
      <span className="text-gold">✦</span>
    </div>
  )
}
