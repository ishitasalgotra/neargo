import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    popup?: string;
    icon?: 'rider' | 'driver';
  }>;
  className?: string;
}

const MapComponent = ({ 
  center = [28.6139, 77.2090], // Default to Delhi
  zoom = 13,
  markers = [],
  className = "h-96 rounded-xl"
}: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center,
      zoom,
      zoomControl: true,
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    // Add new markers
    markers.forEach((marker) => {
      if (!mapRef.current) return;
      
      const leafletMarker = L.marker(marker.position).addTo(mapRef.current);
      
      if (marker.popup) {
        leafletMarker.bindPopup(marker.popup);
      }
    });

    // Fit bounds if markers exist
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => m.position));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers]);

  return (
    <div 
      ref={mapContainerRef} 
      className={`${className} shadow-float border-2 border-border overflow-hidden`}
      style={{ zIndex: 1 }}
    />
  );
};

export default MapComponent;
