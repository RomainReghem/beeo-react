import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import axios from "./api/axios";

const Flyer = ({to}) => {
    const map = useMap();

    useEffect(() => {
        to?.length == 2 && map.flyTo(to, map.getZoom());
    }, [to]);
}

export default Flyer