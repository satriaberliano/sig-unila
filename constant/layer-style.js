export const geoJsonStyle = (feature, geoData) => {
  switch (geoData.name) {
    case "Fakultas Teknik Universitas Lampung":
      return {
        color: "#00008B",
        weight: 1,
        fillOpacity: 0.5,
      };
    case "Fakultas Pertanian Universitas Lampung":
      return {
        color: "green",
        weight: 1,
        fillOpacity: 0.5,
      };
    case "Fakultas Hukum Universitas Lampung":
      return {
        color: "red",
        weight: 1,
        fillOpacity: 0.5,
      };
    case "Fakultas Ekonomi dan Bisnis Universitas Lampung":
      return {
        color: "#808080",
        weight: 1,
        fillOpacity: 0.5,
      };
    case "Fakultas Ilmu Sosial dan Ilmu Politik Universitas Lampung":
      return {
        color: "#FFA500",
        weight: 1,
        fillOpacity: 0.5,
      };
    case "Fakultas Matematika dan Ilmu Pengetahuan Alam Universitas Lampung":
      return {
        color: "blue",
        weight: 1,
        fillOpacity: 0.5,
      };
    case "Fakultas Keguruan dan Ilmu Pendidikan Universitas Lampung":
      return {
        color: "#800080",
        weight: 1,
        fillOpacity: 0.5,
      };
    case "Fakultas Kedokteran Universitas Lampung":
      return {
        color: "#006400",
        weight: 1,
        fillOpacity: 0.7,
      };
    default:
      return {
        color: "gray",
        weight: 1,
        fillOpacity: 0.5,
      };
  }
};
