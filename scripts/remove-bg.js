/**
 * කළු පසුබිම ඉවත් කර PNG transparent එකක් හදන script
 */
import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputPath = join(__dirname, '..', 'public', 'favicon.png')
const outputPath = join(__dirname, '..', 'public', 'favicon.png')

// කළු පික්සල් හඳුනාගෙන transparent කරන threshold (0-255)
const BLACK_THRESHOLD = 45

async function removeBlackBackground() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    // කළු හෝ ඉතා අඳුරු පික්සල් transparent කරන්න
    if (r < BLACK_THRESHOLD && g < BLACK_THRESHOLD && b < BLACK_THRESHOLD) {
      data[i + 3] = 0
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outputPath)

  console.log('✓ කළු පසුබිම ඉවත් කර favicon.png update කරා')
}

removeBlackBackground().catch(console.error)
