'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import routeData from './routeData.json';

// Fix Leaflet's default icon path issues in React/Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

const createCustomIcon = (label: string) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <div style="background-color: white; padding: 4px 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); font-size: 12px; font-weight: bold; color: #3a0f1b; border: 1px solid #fee2e2; white-space: nowrap;">
          ${label}
        </div>
        <div style="width: 24px; height: 24px; border-radius: 50%; background-color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; position: relative;">
          <div style="width: 16px; height: 16px; border-radius: 50%; background-color: #3a0f1b;">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin: 3px;"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div style="position: absolute; bottom: -6px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #3a0f1b;"></div>
        </div>
      </div>
    `,
    iconSize: [120, 60],
    iconAnchor: [60, 50],
  });
};

const ActiveRouteMap = () => {
  // Coordinates for Colombo and Katunayake [lat, lng]
  const colombo: [number, number] = [6.9271, 79.8612];
  const katunayake: [number, number] = [7.1685, 79.8735];

  // Extract positions from the static route data
  const routePositions: [number, number][] = React.useMemo(() => {
    try {
      if (routeData.routes && routeData.routes.length > 0) {
        const coordinates = routeData.routes[0].geometry.coordinates;
        return coordinates.map((coord): [number, number] => [
          coord[1] ?? 0,
          coord[0] ?? 0,
        ]);
      }
    } catch (e) {
      console.error("Error parsing route data", e);
    }
    return [colombo, katunayake]; // Fallback to straight line
  }, []);

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
      <MapContainer
        center={[7.0478, 79.8673]}
        zoom={11}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={colombo} icon={createCustomIcon('Colombo Main Hub')} />
        <Marker position={katunayake} icon={createCustomIcon('Katunayake')} />

        <Polyline
          positions={routePositions}
          pathOptions={{ color: '#741d35', weight: 5, opacity: 0.8 }}
        />
      </MapContainer>
    </div>
  );
};

export default ActiveRouteMap;
