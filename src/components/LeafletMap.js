import { useEffect } from "react";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default function LeafletMap({ setFormData }) {
  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const provider = new OpenStreetMapProvider();
    const searchControl = GeoSearchControl({
      provider,
      style: "button",
      searchLabel: "Enter a location",
      autoComplete: true,
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
    });
    map.addControl(searchControl);

    map.on("geosearch/showlocation", (e) => {
      const { x, y } = e.location;
      setFormData((prevData) => ({
        ...prevData,
        hospital_latitude: y,
        hospital_longitude: x,
      }));
    });

    return () => {
      map.remove();
    };
  }, [setFormData]);

  return <div id="map" style={{ height: "300px", width: "100%" }}></div>;
}
