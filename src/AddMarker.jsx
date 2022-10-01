import { useEffect, useState } from "react";
import { Circle, CircleMarker, LayerGroup, Marker, Popup, useMapEvents } from "react-leaflet";

export default function AddMarker({ radius, placementActivated }) {
    const [coord, setPosition] = useState([]);

    useMapEvents({
        click: (e) => {
            placementActivated && setPosition([...coord, e.latlng]);
        }
    });

    const removeMarker = (pos) => {
        setPosition((prevCoord) =>
            prevCoord.filter((coord) => JSON.stringify(coord) !== JSON.stringify(pos))
        );
    };

    return (
        <>
            {coord.map((pos, idx) => (
                <span key={idx}>
                    <Circle
                        key={`circle-${idx}`}
                        center={pos}
                        pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        radius={radius} />
                    <Marker
                        key={`marker-${idx}`}
                        position={pos}
                        draggable={true}>
                        <Popup>
                            <button onClick={(e) => { e.stopPropagation(); removeMarker(pos) }}>Cliquer pour supprimer</button>
                        </Popup>
                    </Marker>
                </span>
            ))}
        </>
    );
}