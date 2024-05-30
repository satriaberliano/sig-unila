"use client";

import L from "leaflet";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
import "../../node_modules/leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { useState } from "react";
import {
  agricultureOptions,
  businessOptions,
  educationOptions,
  engineeringOptions,
  facultyOfAgriculture,
  facultyOfBusiness,
  facultyOfEducation,
  facultyOfEngineering,
  facultyOfLaw,
  facultyOfMedicine,
  facultyOfScience,
  facultyOfSosPol,
  lawOptions,
  medicineOptions,
  scienceOptions,
  sospolOptions,
} from "@/constant/fasilitas-polygon";

const Map = ({ facilities, search }) => {
  const [coord, setCoord] = useState([-5.364621, 105.243562]);

  // const SearchLocation = () => {
  //   return (
  //     <div className="search-location">
  //       <input type="text" placeholder="Search Location" />
  //     </div>
  //   );
  // };

  // const GetMyLocation = () => {
  //   const getMyLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         setCoord([position.coords.latitude, position.coords.longitude]);
  //       });
  //     } else {
  //       console.log("Geolocation is not supported by this browser.");
  //     }
  //   };

  //   return (
  //     <div className="get-my-location">
  //       <button onClick={getMyLocation}>Get My Location</button>
  //     </div>
  //   );
  // };

  return (
    <div className="flex justify-center items-center flex-col">
      {/* <SearchLocation />
            <GetMyLocation /> */}
      <MapContainer
        center={coord}
        zoom={16}
        scrollWheelZoom={false}
        className="w-full h-[28rem] rounded-md"
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {facilities && facilities.length > 0 ? (
          <>
            {facilities
              .filter((value) => {
                if (search === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return value;
                }
                return null;
              })
              .map((fasilitas, index) => (
                <Marker
                  key={index}
                  icon={
                    new L.Icon({
                      iconUrl: MarkerIcon.src,
                      iconRetinaUrl: MarkerIcon.src,
                      iconSize: [25, 41],
                      iconAnchor: [12.5, 41],
                      popupAnchor: [0, -41],
                      shadowUrl: MarkerShadow.src,
                      shadowSize: [41, 41],
                    })
                  }
                  position={[`${fasilitas.latitude}`, `${fasilitas.longitude}`]}
                >
                  <Popup>{fasilitas.name}</Popup>
                </Marker>
              ))}
          </>
        ) : (
          <></>
        )}

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Fakultas">
            <LayerGroup>
              <Polygon
                pathOptions={engineeringOptions}
                positions={facultyOfEngineering}
              >
                <Popup>Fakultas Teknik</Popup>
              </Polygon>
              <Polygon
                pathOptions={agricultureOptions}
                positions={facultyOfAgriculture}
              >
                <Popup>Fakultas Pertanian</Popup>
              </Polygon>
              <Polygon
                pathOptions={scienceOptions}
                positions={facultyOfScience}
              >
                <Popup>Fakultas Matematika dan Ilmu Pengetahuan Alam</Popup>
              </Polygon>
              <Polygon
                pathOptions={educationOptions}
                positions={facultyOfEducation}
              >
                <Popup>Fakultas Keguruan dan Ilmu Pendidikan</Popup>
              </Polygon>
              <Polygon pathOptions={sospolOptions} positions={facultyOfSosPol}>
                <Popup>Fakultas Ilmu Sosial dan Ilmu Politik</Popup>
              </Polygon>
              <Polygon
                pathOptions={businessOptions}
                positions={facultyOfBusiness}
              >
                <Popup>Fakultas Ekonomi dan Bisnis</Popup>
              </Polygon>
              <Polygon pathOptions={lawOptions} positions={facultyOfLaw}>
                <Popup>Fakultas Hukum</Popup>
              </Polygon>
              <Polygon
                pathOptions={medicineOptions}
                positions={facultyOfMedicine}
              >
                <Popup>Fakultas Kedokteran</Popup>
              </Polygon>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default Map;
