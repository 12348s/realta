import fs from 'fs'
import path from 'path'

const localImages = {
  '100012467': ['https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
  '100255837': ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'],
  '100321963': ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'],
  '100365136': ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800'],
  '100377588': ['https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800', 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800'],
  '100488891': ['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800', 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800'],
  '100506385': ['https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=800', 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800'],
  '100507373': ['https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=800', 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800'],
  '100509773': ['https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800', 'https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=800'],
  '100514735': ['https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800', 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800'],
}

const dataPath = path.join(process.cwd(), 'src', 'app', 'data', 'mumbaiProperties.json')
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
const updated = data.map(property => ({
  ...property,
  images: localImages[property.propertyId].map(url => ({ url, caption: 'PropertyImage' }))
}))
fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2))
console.log('✅ Updated mumbaiProperties.json with Unsplash images')