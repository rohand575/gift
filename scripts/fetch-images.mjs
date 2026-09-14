// Downloads a curated set of gift images into public/images/gifts/.
// Run with: node scripts/fetch-images.mjs
//
// These are tasteful Unsplash photos matched to each gift. Don't love one?
// Replace its URL below (or just drop your own <id>.jpg into public/images/gifts/)
// and re-run. The app also has an elegant gradient fallback, so a missing image
// never breaks the design.
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(here, '../public/images/gifts')

// Unsplash direct image URLs (cropped to a consistent 4:3-ish hero).
const q = 'w=1200&h=900&fit=crop&q=75'
const IMAGES = {
  pandora: `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?${q}`,
  jewelry: `https://images.unsplash.com/photo-1611085583191-a3b181a88401?${q}`,
  dress: `https://images.unsplash.com/photo-1595777457583-95e059d581b8?${q}`,
  keyboard: `https://images.unsplash.com/photo-1587829741301-dc798b83add3?${q}`,
  tablet: `https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?${q}`,
  apple_watch: `https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?${q}`,
  shopping: `https://images.unsplash.com/photo-1483985988355-763728e1935b?${q}`,
  primark: `https://images.unsplash.com/photo-1556905055-8f358a7a47b2?${q}`,
  germany_getaway: `https://images.unsplash.com/photo-1467269204594-9661b134dd2b?${q}`,
  european_getaway: `https://images.unsplash.com/photo-1533105079780-92b9be482077?${q}`,
}

await mkdir(outDir, { recursive: true })

for (const [id, url] of Object.entries(IMAGES)) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 5000) throw new Error('suspiciously small')
    await writeFile(resolve(outDir, `${id}.jpg`), buf)
    console.log(`✓ ${id}.jpg (${(buf.length / 1024).toFixed(0)} kB)`)
  } catch (err) {
    console.warn(`✗ ${id}: ${err.message} — the app will show its gradient fallback.`)
  }
}
