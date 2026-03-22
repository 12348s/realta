'use client';

import { useEffect, useRef } from 'react';

interface SingleMapProps {
  lat: number;
  lng: number;
  locality: string;
}

export default function SinglePropertyMap({ lat, lng, locality }: SingleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    const init = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');
      if (!mapRef.current || instanceRef.current) return;

      const map = L.map(mapRef.current).setView([lat, lng], 14);
      instanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        html: `<div style="background:#E8622A;color:white;padding:4px 10px;border-radius:20px;font-weight:700;font-size:12px;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${locality}</div>`,
        className: '',
        iconAnchor: [40, 15],
      });
      L.marker([lat, lng], { icon }).addTo(map);
    };
    init();
    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, [lat, lng, locality]);

  return <div ref={mapRef} className="w-full h-full" />;
}
