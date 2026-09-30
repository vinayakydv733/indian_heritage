"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Fix Leaflet's default icon path issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapClient({ sites }: { sites: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const getStandardCategory = (cat: string) => {
    if (!cat) return "Other";
    const lower = cat.toLowerCase();
    if (lower.includes('monument') || lower.includes('place')) return 'Monuments';
    if (lower.includes('festival')) return 'Festivals';
    if (lower.includes('dance') || lower.includes('music') || lower.includes('tradition')) return 'Dance & Music';
    if (lower.includes('art') || lower.includes('craft')) return 'Arts & Crafts';
    return cat;
  };

  const filteredSites = activeCategory === "All" 
    ? sites 
    : sites.filter(s => getStandardCategory(s.category) === activeCategory);

  return (
    <div className="flex-1 relative flex">
      {/* Sidebar Filters */}
      <div className="w-80 bg-background border-r p-6 overflow-y-auto hidden md:block z-10 relative">
        <h2 className="font-serif text-2xl font-bold text-primary mb-6">Explore India State by State</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {['All', 'Monuments', 'Festivals', 'Dance & Music', 'Arts & Crafts'].map((cat) => (
                <label key={cat} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-muted rounded-md transition-colors">
                  <input 
                    type="radio" 
                    name="category"
                    checked={activeCategory === cat}
                    onChange={() => setActiveCategory(cat)}
                    className="rounded-full border-input text-primary focus:ring-primary h-4 w-4" 
                  />
                  <span className="text-sm font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          
          <hr className="border-border" />
          
          <div>
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Total Sites</h3>
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-serif font-bold text-3xl text-primary">{filteredSites.length}</h4>
              <p className="text-xs text-muted-foreground mt-1">Verified Nodes in View</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="flex-1 bg-muted relative z-0">
        <MapContainer 
          center={[20.5937, 78.9629]} 
          zoom={5} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredSites.map((loc, idx) => {
            if (!loc.latitude || !loc.longitude) return null;
            return (
              <Marker 
                key={idx} 
                position={[loc.latitude, loc.longitude]}
                icon={customIcon}
              >
                <Popup className="custom-popup">
                  <div className="p-0 min-w-[200px] font-sans">
                    <div 
                      className="w-full h-[120px] bg-cover bg-center rounded-t-md" 
                      style={{ backgroundImage: `url('${loc.image || loc.customImage}')` }}
                    />
                    <div className="p-3">
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                        {loc.category}
                      </span>
                      <h3 className="m-0 mb-3 text-base font-bold text-gray-900 leading-tight">
                        {loc.name}
                      </h3>
                      <Link 
                        href={`/explore/${loc.slug}`} 
                        className="block w-full py-1.5 text-center bg-[#D4AF37] hover:bg-[#b8952b] text-white rounded transition-colors text-sm font-medium"
                      >
                        Explore Detail
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-popup-content-wrapper { padding: 0; overflow: hidden; border-radius: 8px; }
        .leaflet-popup-content { margin: 0; width: 220px !important; }
      `}} />
    </div>
  );
}
