'use client'

import L from 'leaflet'
import MarkerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png'
import "../../node_modules/leaflet/dist/leaflet"
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { useState } from 'react'

export default function Map() {
  const [coord, setCoord] = useState([-5.364621, 105.243562])

    const polygon = [
        [-5.363878, 105.242872],
        [-5.363880, 105.242638],
        [-5.363571, 105.242236],
        [-5.362307, 105.243239],
        [-5.362540, 105.243639]
      ]

    const SearchLocation = () => {
        return (
            <div className="search-location">
                <input type="text" placeholder="Search Location" />
            </div>
        )
    }

    const GetMyLocation = () => {
        const getMyLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCoord([position.coords.latitude, position.coords.longitude])
                })
            } else {
                console.log("Geolocation is not supported by this browser.")
            }
        }

        return (
            <div className="get-my-location">
                <button onClick={getMyLocation}>Get My Location</button>
            </div>
        )
    }

    
    const purpleOptions = { color: 'blue' }

    return (
        <div className='flex justify-center items-center flex-col'>
            {/* <SearchLocation />
            <GetMyLocation /> */}
            <MapContainer style={{
                height: '70vh',
                width: '70vw'
            }} center={coord} zoom={16} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker icon={
                    new L.Icon({
                        iconUrl: MarkerIcon.src,
                        iconRetinaUrl: MarkerIcon.src,
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: MarkerShadow.src,
                        shadowSize: [41, 41],
                    })
                } position={[-5.364621, 105.243562]}>
                     <Popup>
                        Universitas Lampung
                    </Popup>
                </Marker>
                <Polygon pathOptions={purpleOptions} positions={polygon}/>
            </MapContainer>
        </div>
    )
}
