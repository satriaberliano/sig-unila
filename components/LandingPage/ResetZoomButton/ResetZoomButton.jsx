const { useEffect } = require("react");
const { useMap } = require("react-leaflet");

const ResetZoomButton = ({ defaultLat, defaultLng, defaultZoom }) => {
  const map = useMap();

  useEffect(() => {
    const handleResetZoom = () => {
      map.setView([defaultLat, defaultLng], defaultZoom);
    };

    const resetButton = L.control({ position: "topright" });
    resetButton.onAdd = function () {
      const button = L.DomUtil.create("button", "leaflet-bar");
      button.innerHTML = "Reset Zoom";
      button.style.backgroundColor = "white";
      button.style.padding = "5px";
      button.onclick = handleResetZoom;
      return button;
    };

    resetButton.addTo(map);

    return () => {
      map.removeControl(resetButton);
    };
  }, [map, defaultLat, defaultLng, defaultZoom]);

  return null;
};

export default ResetZoomButton;
