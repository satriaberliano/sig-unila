import React, { useEffect, useState } from "react";
import L from "leaflet";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import "../../../node_modules/leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  LayersControl,
  LayerGroup,
  useMap,
} from "react-leaflet";
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

const MapEachFacility = ({ facilityLat, facilityLong, facilityName }) => {
  const [coord, setCoord] = useState([-5.364621, 105.243562]);

  const CustomMap = () => {
    const map = useMap();

    useEffect(() => {
      // Function to update zoom level based on screen size
      const updateZoomLevel = () => {
        const isMobile = window.innerWidth <= 768; // Assuming 768px as the mobile breakpoint
        map.setZoom(isMobile ? 15 : 16);
      };

      // Initial zoom level adjustment
      updateZoomLevel();

      // Add event listener for screen resize
      window.addEventListener("resize", updateZoomLevel);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", updateZoomLevel);
      };
    }, [map]);

    return null;
  };

  // {
  //   console.log(facilityLat);
  // }

  return (
    <div className="flex justify-center items-center flex-col">
      <MapContainer
        center={coord}
        zoom={16}
        scrollWheelZoom={false}
        className="w-full h-[28rem] rounded-md"
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* {facility && facility.length > 0 ? (
          <>
            {facility.map((fasilitas, index) => ( */}
        <Marker
          // key={index}
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
          position={[`${facilityLat}`, `${facilityLong}`]}
        >
          <Popup>{facilityName}</Popup>
        </Marker>
        <CustomMap />
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

export default MapEachFacility;
