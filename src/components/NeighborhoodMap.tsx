'use client';

import { useEffect, useRef } from 'react';

interface Prop {
  propertyId: string;
  location: { coordinates: { latitude: string; longitude: string } };
  price: { range: string };
  title: string;
}

export default function NeighborhoodMap({ properties }: { properties: Prop[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');
      if (!mapRef.current || instanceRef.current) return;

      const map = L.map(mapRef.current).setView([19.076, 72.8777], 11);
      instanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors', maxZoom: 19,
      }).addTo(map);

      properties.forEach((p) => {
        const lat = parseFloat(p.location.coordinates.latitude);
        const lng = parseFloat(p.location.coordinates.longitude);
        const icon = L.divIcon({
          html: `<div style="background:#E8622A;color:white;padding:4px 10px;border-radius:20px;font-weight:700;font-size:12px;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${p.price.range}</div>`,
          className: '', iconAnchor: [30, 15],
        });
        L.marker([lat, lng], { icon }).addTo(map)
          .bindPopup(`<strong>${p.title}</strong><br/><span style="color:#E8622A">${p.price.range}</span>`);
      });
    };
    init();
    return () => { if (instanceRef.current) { instanceRef.current.remove(); instanceRef.current = null; } };
  }, [properties]);

  return <div ref={mapRef} className="w-full h-full" />;
}
