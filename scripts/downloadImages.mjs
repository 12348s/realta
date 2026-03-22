import fs from 'fs'
import path from 'path'
import https from 'https'

const images = [
  { propertyId: '100012467', index: 0, url: 'https://is1-3.housingcdn.com/354cef8f/127449df2c65f581b73bf6e5b282a9c9/v0/version.jpg' },
  { propertyId: '100012467', index: 1, url: 'https://is1-2.housingcdn.com/354cef8f/50b7f95d76c2ea7424e672da20f4bd06/v0/version.jpg' },
  { propertyId: '100255837', index: 0, url: 'https://is1-2.housingcdn.com/354cef8f/0c379d1ab6394af7b618f0016cb70594/v0/version.jpg' },
  { propertyId: '100255837', index: 1, url: 'https://is1-3.housingcdn.com/354cef8f/127a362c26c06d6a52d51280654a4f89/v0/version.jpg' },
  { propertyId: '100321963', index: 0, url: 'https://is1-3.housingcdn.com/354cef8f/4d430884594234ba4c449e1c02996612/v0/version.jpg' },
  { propertyId: '100321963', index: 1, url: 'https://is1-2.housingcdn.com/354cef8f/759d6559142d900eb33b6bd172bb437a/v0/version.jpg' },
  { propertyId: '100365136', index: 0, url: 'https://is1-3.housingcdn.com/354cef8f/083f7f9282df8dd772ba9af7a2877b9f/v0/version.jpg' },
  { propertyId: '100365136', index: 1, url: 'https://is1-3.housingcdn.com/354cef8f/1b43ac21e5dad1194cdc4f85684d557d/v0/version.jpg' },
  { propertyId: '100377588', index: 0, url: 'https://is1-2.housingcdn.com/354cef8f/36369d63b09d6699a3ec159edd9194ac/v0/version.jpg' },
  { propertyId: '100377588', index: 1, url: 'https://is1-2.housingcdn.com/354cef8f/3b066c14c6c0a7971a8858f2283dfc68/v0/version.jpg' },
  { propertyId: '100488891', index: 0, url: 'https://is1-3.housingcdn.com/354cef8f/317daaa8e07358cd9da4ec28bd168553/v0/version.jpg' },
  { propertyId: '100488891', index: 1, url: 'https://is1-3.housingcdn.com/354cef8f/bd4e33bfb7fc698848e5700c03620b8b/v0/version.jpg' },
  { propertyId: '100506385', index: 0, url: 'https://is1-3.housingcdn.com/354cef8f/0ed76c653abe4f2a778910cc50b17640/v0/version.jpg' },
  { propertyId: '100506385', index: 1, url: 'https://is1-3.housingcdn.com/354cef8f/6705147c4cb0b25f69b27276272c6f96/v0/version.jpg' },
  { propertyId: '100507373', index: 0, url: 'https://is1-3.housingcdn.com/354cef8f/140fbc1c06bddfce5ebbf43471df8e0e/v0/version.jpg' },
  { propertyId: '100507373', index: 1, url: 'https://is1-3.housingcdn.com/354cef8f/6705147c4cb0b25f69b27276272c6f96/v0/version.jpg' },
  { propertyId: '100509773', index: 0, url: 'https://is1-2.housingcdn.com/354cef8f/051c29f4c2e53f674debaf71f042489d/v0/version.jpg' },
  { propertyId: '100509773', index: 1, url: 'https://is1-3.housingcdn.com/354cef8f/1b51eed1c946e029dd6bea83f939a2df/v0/version.jpg' },
  { propertyId: '100514735', index: 0, url: 'https://is1-3.housingcdn.com/354cef8f/765a0b494562575ecb6258a73125091e/v0/version.jpg' },
  { propertyId: '100514735', index: 1, url: 'https://is1-3.housingcdn.com/354cef8f/e5a072afcef1fa72a65642d519639ac0/v0/version.jpg' },
]

const outputDir = path.join(process.cwd(), 'public', 'properties')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
  console.log('Created folder: public/properties/')
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const options = {
  headers: {
    'Referer': 'https://housing.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'image',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'cross-site',
  }
}
    https.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close()
        downloadImage(response.headers.location, dest).then(resolve).catch(reject)
        return
      }
      if (response.statusCode !== 200) {
        file.close()
        if (fs.existsSync(dest)) fs.unlinkSync(dest)
        reject(new Error(`Status ${response.statusCode}`))
        return
      }
      response.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', (err) => {
      file.close()
      if (fs.existsSync(dest)) fs.unlinkSync(dest)
      reject(err)
    })
  })
}

async function run() {
  let success = 0
  let failed = 0

  for (const img of images) {
    const filename = `${img.propertyId}-${img.index}.jpg`
    const dest = path.join(outputDir, filename)
    try {
      await downloadImage(img.url, dest)
      console.log(`✅ Downloaded: ${filename}`)
      success++
    } catch (err) {
      console.log(`❌ Failed: ${filename} — ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone! ${success} downloaded, ${failed} failed.`)

  const dataPath = path.join(process.cwd(), 'src', 'app', 'data', 'mumbaiProperties.json')
  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    const updated = data.map(property => ({
      ...property,
      images: property.images.map((img, i) => ({
        ...img,
        url: `/properties/${property.propertyId}-${i}.jpg`
      }))
    }))
    fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2))
    console.log('✅ Updated mumbaiProperties.json with local paths')
  } else {
    console.log('⚠️ mumbaiProperties.json not found — skipping JSON update')
  }
}

run()