"use client";

// import React, { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   GeoJSON,
// } from "react-leaflet";
// import L from "leaflet";
// import * as turf from "@turf/turf";
// import "leaflet/dist/leaflet.css";

// const facilities = [
//   { name: "Perpustakaan", coordinates: [105.2434, -5.3636] },
//   { name: "Gedung Rektorat", coordinates: [105.2429, -5.3625] },
//   { name: "Fakultas Teknik", coordinates: [105.2442, -5.3627] },
//   { name: "Kantin Pusat", coordinates: [105.2438, -5.363] },
//   { name: "Gedung Olahraga", coordinates: [105.2445, -5.3635] },
// ];

// const BufferAnalysisMap = () => {
//   const [map, setMap] = useState(null);
//   const [buffers, setBuffers] = useState([]);

//   useEffect(() => {
//     console.log("Facilities:", facilities);

//     // Buat buffer dan lakukan analisis
//     const buffersWithAnalysis = facilities.map((facility) => {
//       console.log("Creating buffer for:", facility.name);
//       const point = turf.point(facility.coordinates);
//       const buffered = turf.buffer(point, 0.1, { units: "kilometers" });
//       console.log("Buffered:", buffered);

//       const nearbyFacilities = facilities.filter((f) => {
//         if (f.name === facility.name) return false;
//         const otherPoint = turf.point(f.coordinates);
//         return turf.booleanPointInPolygon(otherPoint, buffered);
//       });
//       console.log("Nearby facilities:", nearbyFacilities);

//       return { ...buffered, properties: { ...facility, nearbyFacilities } };
//     });

//     console.log("Buffers with analysis:", buffersWithAnalysis);
//     setBuffers(buffersWithAnalysis);
//   }, []); // Jalankan sekali saat komponen di-mount

//   useEffect(() => {
//     if (map && buffers.length > 0) {
//       const bounds = L.latLngBounds(
//         facilities.map((f) => [f.coordinates[1], f.coordinates[0]])
//       );
//       map.fitBounds(bounds);
//     }
//   }, [map, buffers]);

//   const bufferStyle = (feature) => {
//     return {
//       fillColor:
//         feature.properties.nearbyFacilities.length > 0 ? "green" : "blue",
//       weight: 1,
//       opacity: 1,
//       color: "white",
//       fillOpacity: 0.3,
//     };
//   };

//   console.log("Rendering with buffers:", buffers);

//   return (
//     <MapContainer
//       center={[-5.3631, 105.2435]}
//       zoom={16}
//       style={{ height: "500px", width: "100%" }}
//       whenCreated={setMap}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {facilities.map((facility, index) => (
//         <CircleMarker
//           key={index}
//           center={[facility.coordinates[1], facility.coordinates[0]]}
//           radius={5}
//           fillColor="red"
//           color="red"
//         >
//           <Popup>{facility.name}</Popup>
//         </CircleMarker>
//       ))}
//       {buffers.map((buffer, index) => (
//         <GeoJSON
//           key={index}
//           data={buffer}
//           // style={bufferStyle}
//         >
//           <Popup>
//             <div>
//               <h3>{buffer.properties.name}</h3>
//               <p>Fasilitas terdekat dalam radius 100m:</p>
//               <ul>
//                 {buffer.properties.nearbyFacilities.map((f, i) => (
//                   <li key={i}>{f.name}</li>
//                 ))}
//               </ul>
//             </div>
//           </Popup>
//         </GeoJSON>
//       ))}
//     </MapContainer>
//   );
// };

// export default BufferAnalysisMap;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";

const facilities = [
  { name: "Perpustakaan", coordinates: [105.2434, -5.3636] },
  { name: "Gedung Rektorat", coordinates: [105.2429, -5.3625] },
  { name: "Fakultas Teknik", coordinates: [105.2442, -5.3627] },
  { name: "Kantin Pusat", coordinates: [105.2438, -5.363] },
  { name: "Gedung Olahraga", coordinates: [105.2445, -5.3635] },
];

const FacilityMap = () => {
  const [map, setMap] = useState(null);
  const [facilitiesWithNearby, setFacilitiesWithNearby] = useState([]);

  useEffect(() => {
    const analysisResults = facilities.map((facility) => {
      const point = turf.point(facility.coordinates);
      const buffered = turf.buffer(point, 0.1, { units: "kilometers" });

      const nearbyFacilities = facilities.filter((f) => {
        if (f.name === facility.name) return false;
        const otherPoint = turf.point(f.coordinates);
        return turf.booleanPointInPolygon(otherPoint, buffered);
      });

      return { ...facility, nearbyFacilities };
    });

    setFacilitiesWithNearby(analysisResults);
  }, []);

  useEffect(() => {
    if (map && facilitiesWithNearby.length > 0) {
      const bounds = L.latLngBounds(
        facilitiesWithNearby.map((f) => [f.coordinates[1], f.coordinates[0]])
      );
      map.fitBounds(bounds);
    }
  }, [map, facilitiesWithNearby]);

  return (
    <MapContainer
      center={[-5.3631, 105.2435]}
      zoom={16}
      style={{ height: "500px", width: "100%" }}
      whenCreated={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {facilitiesWithNearby.map((facility, index) => (
        <CircleMarker
          key={index}
          center={[facility.coordinates[1], facility.coordinates[0]]}
          radius={5}
          fillColor="red"
          color="red"
        >
          <Popup>
            <div>
              <h3>{facility.name}</h3>
              <p>Fasilitas terdekat dalam radius 100m:</p>
              {facility.nearbyFacilities.length > 0 ? (
                <ul>
                  {facility.nearbyFacilities.map((f, i) => (
                    <li key={i}>{f.name}</li>
                  ))}
                </ul>
              ) : (
                <p>Tidak ada fasilitas terdekat dalam radius 100m.</p>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
    // <>
    //   {facilitiesWithNearby.map((facility, index) => (
    //     <div key={index} className="p-2">
    //       <h3>{facility.name}</h3>
    //       <p>Fasilitas terdekat dalam radius 100m:</p>
    //       {facility.nearbyFacilities.length > 0 ? (
    //         <ul>
    //           {facility.nearbyFacilities.map((f, i) => (
    //             <li key={i}>{f.name}</li>
    //           ))}
    //         </ul>
    //       ) : (
    //         <p>Tidak ada fasilitas terdekat dalam radius 100m.</p>
    //       )}
    //     </div>
    //   ))}
    // </>
  );
};

export default FacilityMap;
