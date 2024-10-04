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
import Image from "next/image";
import assets from "@/assets/assets";
import Loading from "../Admin/Loading/Loading";

const jakarta_sans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic-ext"],
});

const ImageWithLoading = ({ src, alt, width, height, quality }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-sm">
          <span className="text-gray-500 text-sm animate-pulse">
            <svg
              aria-hidden="true"
              className={`w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};

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
        scrollWheelZoom={true}
        className={`w-full ${height} rounded-md `}
        attributionControl={false}
      >
        <TileLayer
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
            {facilities.map((fasilitas, index) => (
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
                  <div className="space-y-3">
                    <span className="font-semibold text-sm">
                      {fasilitas.name}
                    </span>
                    {/* <Image
                      src={fasilitas.url_image || assets.defaultImage}
                      className="aspect-[3/4]"
                      alt={`${fasilitas.name} image`}
                      width={100}
                      height={100}
                      quality={25}
                    /> */}
                    <ImageWithLoading
                      src={fasilitas.url_image || assets.defaultImage}
                      alt={`${fasilitas.name} image`}
                      width={100}
                      height={100}
                      quality={100}
                    />
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
