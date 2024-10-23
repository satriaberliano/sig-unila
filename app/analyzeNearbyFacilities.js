import * as turf from "@turf/turf";

export const analyzeNearbyFacilities = (targetFacility, allFacilities) => {
  const point = turf.point([
    parseFloat(targetFacility.latitude),
    parseFloat(targetFacility.longitude),
  ]);
  const buffered = turf.buffer(point, 0.1, { units: "kilometers" });

  return allFacilities.filter((facility) => {
    if (facility.id === targetFacility.id) return false;
    const otherPoint = turf.point([
      parseFloat(facility.latitude),
      parseFloat(facility.longitude),
    ]);

    return turf.booleanPointInPolygon(otherPoint, buffered);
  });
};
