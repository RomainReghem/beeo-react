import { useState } from "react";
import { Marker } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import * as L from "leaflet";
import { LatLng } from "leaflet";

// Here is where we handle user clicks and set their markers
const UserMarkers = ({ radius, placementActivated }) => {
    const map = useMapEvents({
        click(e) {
            if (placementActivated) {
                const { lat, lng } = e.latlng;
                L.marker([lat, lng]).addTo(map);
                L.circle(e.latlng, { radius: radius }).addTo(map)
            }

        }
    })
    return null
}

export default UserMarkers;