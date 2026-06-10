/**
 * Pexels image downloader for Destino Travels
 *
 * Usage:
 *   1. Get a free API key at https://www.pexels.com/api/
 *   2. Store in .env.local: PEXELS_API_KEY=your_key
 *   3. Run: npx ts-node scripts/download-images.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PEXELS_KEY = process.env.PEXELS_API_KEY || ''

interface PexelsPhoto {
  id: number
  src: { original: string; large2x: string; large: string; medium: string }
  alt: string
  photographer: string
}

interface PexelsResponse {
  photos: PexelsPhoto[]
}

interface ImageJob {
  query: string
  filename: string
  folder: string
  size: 'large2x' | 'large' | 'medium'
}

const BASE_DIR = path.join(__dirname, '..', 'public', 'images')

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function download(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const proto = url.startsWith('https') ? https : http
    proto.get(url, (response) => {
      if (response.statusCode === 302 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject)
      }
      response.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err) })
  })
}

async function fetchPhoto(query: string): Promise<PexelsPhoto | null> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`
  return new Promise((resolve) => {
    https.get(url, { headers: { Authorization: PEXELS_KEY } }, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => {
        try {
          const json: PexelsResponse = JSON.parse(data)
          resolve(json.photos?.[0] || null)
        } catch { resolve(null) }
      })
    }).on('error', () => resolve(null))
  })
}

const JOBS: ImageJob[] = [
  // Hero
  { query: 'maldives aerial ocean', filename: 'hero-1.jpg', folder: 'hero', size: 'large2x' },
  { query: 'kerala backwaters sunset', filename: 'hero-2.jpg', folder: 'hero', size: 'large2x' },
  { query: 'dubai skyline night', filename: 'hero-3.jpg', folder: 'hero', size: 'large2x' },
  // Destinations
  { query: 'bali temple', filename: 'dest-bali.jpg', folder: 'destinations', size: 'large' },
  { query: 'paris eiffel tower', filename: 'dest-paris.jpg', folder: 'destinations', size: 'large' },
  { query: 'dubai desert', filename: 'dest-dubai.jpg', folder: 'destinations', size: 'large' },
  { query: 'maldives beach', filename: 'dest-maldives.jpg', folder: 'destinations', size: 'large' },
  { query: 'singapore city', filename: 'dest-singapore.jpg', folder: 'destinations', size: 'large' },
  { query: 'kerala backwaters', filename: 'dest-kerala.jpg', folder: 'destinations', size: 'large' },
  { query: 'switzerland alps', filename: 'dest-switzerland.jpg', folder: 'destinations', size: 'large' },
  { query: 'new york city', filename: 'dest-newyork.jpg', folder: 'destinations', size: 'large' },
  { query: 'bangkok temple', filename: 'dest-bangkok.jpg', folder: 'destinations', size: 'large' },
  { query: 'london big ben', filename: 'dest-london.jpg', folder: 'destinations', size: 'large' },
  { query: 'tokyo japan', filename: 'dest-tokyo.jpg', folder: 'destinations', size: 'large' },
  { query: 'rome colosseum', filename: 'dest-rome.jpg', folder: 'destinations', size: 'large' },
  // Services
  { query: 'airplane window sky', filename: 'service-air-ticketing.jpg', folder: 'services', size: 'medium' },
  { query: 'passport visa stamp', filename: 'service-visa.jpg', folder: 'services', size: 'medium' },
  { query: 'travel luggage map', filename: 'service-tour.jpg', folder: 'services', size: 'medium' },
  { query: 'embassy building', filename: 'service-global-visa.jpg', folder: 'services', size: 'medium' },
  { query: 'hotel luxury lobby', filename: 'service-hotel.jpg', folder: 'services', size: 'medium' },
  { query: 'travel insurance document', filename: 'service-insurance.jpg', folder: 'services', size: 'medium' },
  { query: 'certificate official document', filename: 'service-attestation.jpg', folder: 'services', size: 'medium' },
  { query: 'currency exchange money', filename: 'service-forex.jpg', folder: 'services', size: 'medium' },
  { query: 'couple honeymoon beach', filename: 'service-honeymoon.jpg', folder: 'services', size: 'medium' },
  // Packages
  { query: 'family vacation beach', filename: 'package-maldives.jpg', folder: 'packages', size: 'large' },
  { query: 'honeymoon couple sunset', filename: 'package-bali.jpg', folder: 'packages', size: 'large' },
  { query: 'dubai luxury hotel', filename: 'package-dubai.jpg', folder: 'packages', size: 'large' },
  { query: 'kerala resort pool', filename: 'package-kerala.jpg', folder: 'packages', size: 'large' },
  { query: 'europe tour sightseeing', filename: 'package-europe.jpg', folder: 'packages', size: 'large' },
  { query: 'singapore marina bay', filename: 'package-singapore.jpg', folder: 'packages', size: 'large' },
  // Testimonials
  { query: 'indian man portrait smile', filename: 'avatar-1.jpg', folder: 'testimonials', size: 'medium' },
  { query: 'indian woman portrait professional', filename: 'avatar-2.jpg', folder: 'testimonials', size: 'medium' },
  { query: 'couple smiling travel', filename: 'avatar-3.jpg', folder: 'testimonials', size: 'medium' },
  { query: 'family vacation happy', filename: 'avatar-4.jpg', folder: 'testimonials', size: 'medium' },
  { query: 'young man professional', filename: 'avatar-5.jpg', folder: 'testimonials', size: 'medium' },
  { query: 'woman professional portrait', filename: 'avatar-6.jpg', folder: 'testimonials', size: 'medium' },
  // About
  { query: 'travel agency office team', filename: 'about-team.jpg', folder: 'about', size: 'large' },
  { query: 'professional travel consultant desk', filename: 'about-office.jpg', folder: 'about', size: 'large' },
]

async function main() {
  if (!PEXELS_KEY || PEXELS_KEY === 'your_pexels_api_key_here') {
    console.log('\u26A0 No Pexels API key set. Add PEXELS_API_KEY to .env.local and re-run.')
    console.log('   Get a free key at: https://www.pexels.com/api/')
    void process.exit(0)
  }

  console.log(`\uD83D\uDCF7 Downloading ${JOBS.length} images from Pexels...\n`)

  for (const job of JOBS) {
    const dest = path.join(BASE_DIR, job.folder, job.filename)
    ensureDir(path.dirname(dest))

    if (fs.existsSync(dest)) {
      console.log(`  \u2713 ${job.folder}/${job.filename} (already exists)`)
      continue
    }

    const photo = await fetchPhoto(job.query)
    if (!photo) {
      console.log(`  \u2717 ${job.folder}/${job.filename} — no results for "${job.query}"`)
      continue
    }

    const url = photo.src[job.size]
    try {
      await download(url, dest)
      const stats = fs.statSync(dest)
      console.log(`  \u2713 ${job.folder}/${job.filename} (${(stats.size / 1024).toFixed(0)}KB)`)
    } catch (err) {
      console.log(`  \u2717 ${job.folder}/${job.filename} — download failed`)
    }
  }

  console.log('\n\u2705 Done!')
}

main()
