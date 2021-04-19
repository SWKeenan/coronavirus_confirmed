import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { icon } from "leaflet"

const ICON = icon({
  iconUrl: "/marker.svg",
  iconSize: [16, 16],
})

const Map = ({ countryMonth }) => {
    console.log(countryMonth)
  return (
    <MapContainer center={[countryMonth.Lat, countryMonth.Lon]} zoom={1} scrollWheelZoom={false} style={{height: 200, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={ICON} position={[countryMonth.Lat, countryMonth.Lon]}>
        <Popup>
          {countryMonth.Country} is here. 
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map