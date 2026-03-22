'use client'

import { useEffect, useRef } from 'react'

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

        const icon = L.divIcon({
          html: `<div style="
            background: #E8622A;
            color: white;
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 12px;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
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
            background: ${isHighlighted ? '#1C2B3A' : '#E8622A'};
            color: white;
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 12px;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transform: ${isHighlighted ? 'scale(1.15)' : 'scale(1)'};
            transition: all 0.2s;
            cursor: pointer;
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 
        flex gap-3 z-[1000]">
        <button className="flex items-center gap-2 px-4 py-2 
          rounded-full text-white text-sm font-semibold shadow-lg"
          style={{ background: '#1C2B3A' }}>
          🛰 Satellite View
        </button>
        <button className="flex items-center gap-2 px-4 py-2 
          rounded-full text-white text-sm font-semibold shadow-lg"
          style={{ background: '#E8622A' }}>
          ➤ Search Area
        </button>
      </div>
    </div>
  )
}
