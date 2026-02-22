/**
 * ZShool - නවීන WebP icon generator
 * Modern, minimal design
 */
import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const size = 512

// නවීන පෙනුම - rounded corners, minimal, vibrant gradient
const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="50%" stop-color="#14b8a6"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <linearGradient id="page1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e0f2fe"/>
    </linearGradient>
    <linearGradient id="page2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#ccfbf1"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <g transform="translate(80, 80)">
    <path d="M0 40 L0 312 Q0 320 176 288 L176 40 Q88 24 0 40 Z" fill="url(#page1)" opacity="0.98"/>
    <path d="M176 40 L176 288 L352 320 L352 40 Z" fill="url(#page2)" opacity="0.98"/>
    <path d="M176 40 L176 288" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
  </g>
</svg>
`

async function generate() {
  const publicDir = join(__dirname, '..', 'public')
  mkdirSync(publicDir, { recursive: true })

  const buffer = Buffer.from(svgIcon)

  await sharp(buffer)
    .resize(size, size)
    .webp({ quality: 94, effort: 6 })
    .toFile(join(publicDir, 'icon.webp'))

  await sharp(buffer)
    .resize(192, 192)
    .webp({ quality: 92 })
    .toFile(join(publicDir, 'icon-192.webp'))

  await sharp(buffer)
    .resize(512, 512)
    .webp({ quality: 94 })
    .toFile(join(publicDir, 'icon-512.webp'))

  await sharp(buffer)
    .resize(32, 32)
    .png()
    .toFile(join(publicDir, 'favicon.png'))

  console.log('✓ Generated icon.webp, icon-192.webp, icon-512.webp, favicon.png')
}

generate().catch(console.error)
