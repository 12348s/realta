'use client'

import { useEffect, useRef } from 'react'
import { Layers, Navigation } from 'lucide-react'

interface Property {
  propertyId: string
  title: string
  price: { range: string }
  location: {
    locality: string
    city: string
    coordinates: { latitude: string; longitude: string }
  }
  possession: { status: string }
}

interface PropertyMapProps {
  properties: Property[]
  hoveredId: string | null
  onMarkerClick: (id: string) => void
}

export default function PropertyMap({
  properties,
  hoveredId,
  onMarkerClick
}: PropertyMapProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([])
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically import leaflet only on client
    const initMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      if (!mapContainerRef.current || mapRef.current) return

      // Initialize map
      const map = L.map(mapContainerRef.current).setView(
        [19.0760, 72.8777], 11
      )
      mapRef.current = map

      // Add OpenStreetMap tiles
      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }
      ).addTo(map)

      // Add markers for each property
      properties.forEach((property) => {
        const lat = parseFloat(property.location.coordinates.latitude)
        const lng = parseFloat(property.location.coordinates.longitude)

        // Convert long price "₹1.85 Cr" to something like "$1.85M" based on screenshot, or just use the range. Let's use property.price.range but style it like the screenshot. 
        // Screenshot uses `$1.25M`. We'll just display `property.price.range` since the prompt said not to change logic/data.
        
        const icon = L.divIcon({
          html: `<div style="
            background: white;
            color: #1A1A1A;
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 13px;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            cursor: pointer;
            border: 1px solid #E5E0D8;
          ">${property.price.range}</div>`,
          className: '',
          iconAnchor: [30, 15],
        })

        const marker = L.marker([lat, lng], { icon }).addTo(map)

        const popupContent = `
          <div style="min-width:180px;font-family:Inter,sans-serif">
            <p style="font-weight:700;font-size:14px;margin:0 0 4px">
              ${property.title}
            </p>
            <p style="color:#E8622A;font-weight:700;margin:0 0 4px">
              ${property.price.range}
            </p>
            <p style="color:#6B7280;font-size:12px;margin:0 0 8px">
              ${property.location.locality}, ${property.location.city}
            </p>
            <a href="/properties/${property.propertyId}" 
               style="color:#E8622A;font-weight:600;font-size:13px;
               text-decoration:none">
              View Details →
            </a>
          </div>
        `
        marker.bindPopup(popupContent)

        marker.on('click', () => {
          onMarkerClick(property.propertyId)
        })

        markersRef.current.push({
          id: property.propertyId,
          marker,
          lat,
          lng,
          price: property.price.range
        })
      })
    }

    initMap()

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markersRef.current = []
      }
    }
  }, [properties, onMarkerClick]) // Re-run if properties change

  // Update marker styles when hoveredId changes
  useEffect(() => {
    if (!mapRef.current) return

    const updateIcons = async () => {
      const L = (await import('leaflet')).default
      markersRef.current.forEach(({ id, marker, price }) => {
        const isHighlighted = id === hoveredId
        const newIcon = L.divIcon({
          html: `<div style="
            background: ${isHighlighted ? '#E8622A' : 'white'};
            color: ${isHighlighted ? 'white' : '#1A1A1A'};
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 13px;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: ${isHighlighted ? 'scale(1.05)' : 'scale(1)'};
            transition: all 0.2s;
            cursor: pointer;
            border: 1px solid ${isHighlighted ? '#E8622A' : '#E5E0D8'};
            z-index: ${isHighlighted ? '1000' : '1'};
          ">${price}</div>`,
          className: '',
          iconAnchor: [30, 15],
        })
        marker.setIcon(newIcon)
      })
    }

    updateIcons()
  }, [hoveredId])

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-[1000]">
        <button className="flex items-center gap-2.5 px-6 py-3 
          rounded-full text-white text-[15px] font-bold shadow-lg hover:scale-105 transition-transform"
          style={{ background: '#131722' }}>
          <Layers className="w-5 h-5 opacity-90" /> Satellite View
        </button>
        <button className="flex items-center gap-2.5 px-6 py-3 
          rounded-full text-white text-[15px] font-bold shadow-lg hover:scale-105 transition-transform"
          style={{ background: '#E8622A' }}>
          <Navigation className="w-5 h-5 opacity-90 fill-white" /> Search Area
        </button>
      </div>
    </div>
  )
}
