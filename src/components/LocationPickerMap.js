import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

const LocationPickerMap = ({ setFormData }) => {
    const [position, setPosition] = useState(null);

    const MapClickHandler = () => {
        useMapEvents({
            click(event) {
                const { lat, lng } = event.latlng;
                setPosition([lat, lng]);
                setFormData((prevData) => ({
                    ...prevData,
                    latitude: lat,
                    longitude: lng,
                }));

                // Reverse geocoding to get address
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                    .then(res => res.json())
                    .then(data => {
                        setFormData((prevData) => ({
                            ...prevData,
                            address: data.display_name,
                        }));
                    });
            },
        });

        return position ? (
            <Marker position={position}>
                <Popup>Selected Location</Popup>
            </Marker>
        ) : null;
    };

    return (
        <MapContainer center={[23.685, 90.3563]} zoom={13} style={{ width: "100%", height: "400px" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <MapClickHandler />
        </MapContainer>
    );
};

export default LocationPickerMap;
