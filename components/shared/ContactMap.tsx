'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export default function ContactMap() {
  return (
    <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-md" style={{ isolation: 'isolate' }}>
      <MapContainer
        center={[11.983304, 75.556311]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[11.983304, 75.556311]} icon={icon}>
          <Popup>
            <strong>Destino Tours &amp; Travels</strong>
            <br />
            Near Canara Bank, Iritty Road<br />
            Irikkur, Kannur, Kerala
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
