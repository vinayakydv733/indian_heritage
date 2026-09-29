"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MiniMapProps {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function MiniMap({ lat, lng, zoom = 10 }: MiniMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (map.current) return;
    
    // Only try to initialize if we have a real coordinate (not 0,0 fallback)
    if (lat === 0 && lng === 0) {
      setMapError(true);
      return;
    }

    if (mapContainer.current) {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      if (!token || token.includes("dummy")) {
        setMapError(true);
        return;
      }
      
      mapboxgl.accessToken = token;

      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          center: [lng, lat],
          zoom: zoom,
          interactive: false // Mini-maps usually don't need dragging/zooming to stay clean
        });

        new mapboxgl.Marker({ color: "#D4AF37" })
          .setLngLat([lng, lat])
          .addTo(map.current);
          
      } catch (err) {
        setMapError(true);
      }
    }
  }, [lat, lng, zoom]);

  if (mapError) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center p-4 text-center border-t border-border/50">
        <p className="text-sm text-muted-foreground">Map data unavailable for this location.</p>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-full" />;
}
