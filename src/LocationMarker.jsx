import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const icon = new L.Icon({
    iconUrl: '/bluecircle.png',
    iconSize: [36, 36]
})

const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          Vous êtes ici
        </Popup>
      </Marker>
    );
  }

  export default LocationMarker;