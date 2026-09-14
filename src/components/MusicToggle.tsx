import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site'

// A tiny, unobtrusive music button. Never autoplays (PRD §44). If no audio file
// is present at the configured path, the control hides itself gracefully.
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio(import.meta.env.BASE_URL + site.music.src)
    audio.loop = true
    audio.volume = 0.35
    audio.addEventListener('error', () => setAvailable(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  if (!available) return null

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setAvailable(false)
      }
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="glass fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center
        rounded-full text-lg shadow-soft transition-transform hover:scale-105"
    >
      {playing ? '🎵' : '🔈'}
    </button>
  )
}
