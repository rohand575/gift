// Client-side gift DISPLAY data only. Notice: no prices here — prices live
// exclusively in the Supabase seed and never reach the browser in production.
// `id` values MUST match the seed in supabase/migrations. `isExclusive` is safe
// to expose (it only drives the "whole adventure" confirmation UX, not money).

export type GiftCategory = 'keep' | 'use' | 'experience' | 'go'

export interface GiftDisplay {
  id: string
  title: string
  description: string
  category: GiftCategory
  isExclusive: boolean
  image: string // relative to the app base URL
}

export const categories: Record<GiftCategory, { label: string; emoji: string }> = {
  keep: { label: 'Something You Can Keep', emoji: '💎' },
  use: { label: 'Something You Can Use', emoji: '✨' },
  experience: { label: 'Something You Can Experience', emoji: '👗' },
  go: { label: 'Somewhere We Can Go', emoji: '✈️' },
}

export const gifts: GiftDisplay[] = [
  {
    id: 'pandora',
    title: 'A Little Sparkle',
    description: 'Something beautiful to keep, wear, and remember this chapter by.',
    category: 'keep',
    isExclusive: false,
    image: 'images/gifts/pandora.jpg',
  },
  {
    id: 'jewelry',
    title: 'Something Precious',
    description: 'A little piece chosen especially for you.',
    category: 'keep',
    isExclusive: false,
    image: 'images/gifts/jewelry.jpg',
  },
  {
    id: 'dress',
    title: 'The Perfect Dress',
    description: 'Because sometimes a new chapter deserves a new look.',
    category: 'keep',
    isExclusive: false,
    image: 'images/gifts/dress.jpg',
  },
  {
    id: 'keyboard',
    title: 'Your Dream Setup',
    description:
      'Something beautiful for your desk, your creativity, and everything that comes next.',
    category: 'use',
    isExclusive: false,
    image: 'images/gifts/keyboard.jpg',
  },
  {
    id: 'tablet',
    title: 'The Little Magic Screen',
    description: 'For studying, creating, travelling, watching, and everything in between.',
    category: 'use',
    isExclusive: true,
    image: 'images/gifts/tablet.jpg',
  },
  {
    id: 'apple_watch',
    title: 'A Little Something for Every Day',
    description: 'A little companion for wherever the next chapter takes you.',
    category: 'use',
    isExclusive: true,
    image: 'images/gifts/apple_watch.jpg',
  },
  {
    id: 'shopping',
    title: 'A Day of Shopping',
    description: 'You choose what you want. No overthinking. Just have fun.',
    category: 'experience',
    isExclusive: false,
    image: 'images/gifts/shopping.jpg',
  },
  {
    id: 'primark',
    title: 'A Little Treat',
    description: 'A little voucher for bits and bobs and small finds that make you smile.',
    category: 'experience',
    isExclusive: false,
    image: 'images/gifts/primark.jpg',
  },
  {
    id: 'germany_getaway',
    title: 'The Enchanted Escape',
    description: 'Two nights somewhere beautiful. Just the two of us.',
    category: 'go',
    isExclusive: false,
    image: 'images/gifts/germany_getaway.jpg',
  },
  {
    id: 'european_getaway',
    title: 'A Little Adventure',
    description: 'A little trip outside Germany. Somewhere new, somewhere beautiful.',
    category: 'go',
    isExclusive: true,
    image: 'images/gifts/european_getaway.jpg',
  },
]

export const giftById = (id: string) => gifts.find((g) => g.id === id)
