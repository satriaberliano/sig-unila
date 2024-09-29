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
  ScaleControl,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
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
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { useFetchData } from "@/zustand/useFetchData";
import ResetZoomButton from "../LandingPage/ResetZoomButton/ResetZoomButton";

const jakarta_sans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic-ext"],
});

const Map = ({ facilities, search, height }) => {
  const [coord, setCoord] = useState([-5.364621, 105.243562]);
  const [defLat, setDefLat] = useState("-5.364621");
  const [defLng, setDefLon] = useState("105.243562");
  const [navigateGoogle, setNavigateGoogle] = useState(
    "https://www.google.com/maps/place/"
  );

  const { setFacility } = useFetchData();

  const dataFacilityHandler = (val) => {
    setFacility(val);
  };

  return (
    <div
      className={`flex justify-center items-center flex-col z-0 shadow-sm border-[2px] rounded-md`}
    >
      <MapContainer
        center={coord}
        zoom={16}
        scrollWheelZoom={false}
        className={`w-full ${height} rounded-md `}
        attributionControl={false}
      >
        <TileLayer
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url={
            `https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}@2x.png?apikey=6e5478c8a4f54c779f85573c0e399391` ||
            `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
          }
        />
        <ResetZoomButton
          defaultLat={defLat}
          defaultLng={defLng}
          defaultZoom={16}
        />
        {facilities && facilities.length > 0 ? (
          <>
            {facilities
              // .filter((value) => {
              //   if (search === "") {
              //     return value;
              //   } else if (
              //     value.name.toLowerCase().includes(search.toLowerCase())
              //   ) {
              //     return value;
              //   }
              //   return null;
              // })
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
                  <Popup className={jakarta_sans.className}>
                    <p className="font-semibold text-sm">{fasilitas.name}</p>
                    <div className="flex justify-start items-center text-white gap-x-3">
                      <Link
                        className="bg-[#0F6EE3] px-2 py-1 rounded-sm text-xs"
                        href={`fasilitas/${fasilitas.id}`}
                        onClick={() => dataFacilityHandler(fasilitas)}
                      >
                        <span className="text-white">Rincian</span>
                      </Link>
                      <Link
                        className="bg-[#0F6EE3] px-2 py-1 rounded-sm text-xs"
                        href={`${navigateGoogle}${fasilitas.latitude}+${fasilitas.longitude}`}
                      >
                        <span className="text-white">Navigasi</span>
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </>
        ) : (
          <></>
        )}
        <ScaleControl position="bottomright"></ScaleControl>

        <LayersControl position="topright">
          <LayersControl.Overlay
            checked
            name="Fakultas"
            className={jakarta_sans.className}
          >
            <LayerGroup>
              <Polygon
                pathOptions={engineeringOptions}
                positions={facultyOfEngineering}
              >
                <Popup className={jakarta_sans.className}>
                  Fakultas Teknik
                </Popup>
              </Polygon>
              <Polygon
                pathOptions={agricultureOptions}
                positions={facultyOfAgriculture}
              >
                <Popup className={jakarta_sans.className}>
                  Fakultas Pertanian
                </Popup>
              </Polygon>
              <Polygon
                pathOptions={scienceOptions}
                positions={facultyOfScience}
              >
                <Popup className={jakarta_sans.className}>
                  Fakultas Matematika dan Ilmu Pengetahuan Alam
                </Popup>
              </Polygon>
              <Polygon
                pathOptions={educationOptions}
                positions={facultyOfEducation}
              >
                <Popup className={jakarta_sans.className}>
                  Fakultas Keguruan dan Ilmu Pendidikan
                </Popup>
              </Polygon>
              <Polygon pathOptions={sospolOptions} positions={facultyOfSosPol}>
                <Popup className={jakarta_sans.className}>
                  Fakultas Ilmu Sosial dan Ilmu Politik
                </Popup>
              </Polygon>
              <Polygon
                pathOptions={businessOptions}
                positions={facultyOfBusiness}
              >
                <Popup className={jakarta_sans.className}>
                  Fakultas Ekonomi dan Bisnis
                </Popup>
              </Polygon>
              <Polygon pathOptions={lawOptions} positions={facultyOfLaw}>
                <Popup className={jakarta_sans.className}>Fakultas Hukum</Popup>
              </Polygon>
              <Polygon
                pathOptions={medicineOptions}
                positions={facultyOfMedicine}
              >
                <Popup className={jakarta_sans.className}>
                  Fakultas Kedokteran
                </Popup>
              </Polygon>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default Map;
