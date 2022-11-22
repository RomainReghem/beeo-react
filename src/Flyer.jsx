import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import axios from "./api/axios";

const Flyer = ({ to, setBounds }) => {
    const map = useMap();
    useEffect(() => {
        getMapBounds()
    }, [])

    map.on('moveend', ()=> {
        getMapBounds()
    });

    const getMapBounds = () => {
        let b = map.getBounds();
        console.log(map.get)
        setBounds(`{"type": "Polygon", "coordinates": 
        [[[${b.getNorthWest().lng} , ${b.getNorthWest().lat} ], 
        [ ${b.getNorthEast().lng}, ${b.getNorthEast().lat} ], 
        [ ${b.getSouthEast().lng} , ${b.getSouthEast().lat}], 
        [ ${b.getSouthWest().lng} , ${b.getSouthWest().lat}], 
        [ ${b.getNorthWest().lng} , ${b.getNorthWest().lat}]]]}`)
        
    }

    useEffect(() => {
        to?.length == 2 && map.flyTo(to, map.getZoom());
    }, [to]);
}

export default Flyer