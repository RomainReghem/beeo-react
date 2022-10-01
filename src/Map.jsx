import { Box, Button, Divider, Heading, Icon, IconButton, Stack, Switch, Text } from "@chakra-ui/react"
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon, GeoJSON, LayerGroup, useMapEvents } from "react-leaflet";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react'
import { BiRadar } from 'react-icons/bi'
import Calques from "./Calques";
import zonesBioJSON from './jsons/greenZonesTarnFull.json'
import rivieresJSON from './jsons/riversDataTarn.json'
import fermesBioJSON from './jsons/farmsData.json'
import pollusolJSON from './jsons/pollusol.json'
import zonesIndusJSON from './jsons/zonesIndus.json'
import pollusolPointsJSON from './jsons/pollusolPoints.json'
import { useRef, useState } from "react";
import * as L from "leaflet";
import AddMarker from "./AddMarker";
import { useNavigate } from "react-router-dom";

const zonesBio = zonesBioJSON.data;
const rivieres = rivieresJSON.data;
const fermesBio = fermesBioJSON.data;
const pollusol = pollusolJSON.data;
const zonesIndus = zonesIndusJSON.data;
const pollusolPoints = pollusolPointsJSON.data;
const fermesBioIcon = new L.Icon({
    iconUrl: './src/assets/farm.png',
    iconSize: [36, 42]
})
const rivieresIcon = new L.Icon({
    iconUrl: './src/assets/river.png',
    iconSize: [36, 42]
})
const pollusolIcon = new L.Icon({
    iconUrl: './src/assets/pollu.png',
    iconSize: [36, 42]
})
const zonesIndusIcon = new L.Icon({
    iconUrl: './src/assets/indus.png',
    iconSize: [36, 42]
})

const calculateRiverNote = (note) => {
    let toR = ''
    note >= 17 ? toR = "<span style='background-color:rgb(69, 231, 118)'>Très bonne</span>" :
        note < 17 && 14.5 <= note ? toR = "<span style='background-color:rgb(113, 230, 253)'>Bonne</span>" :
            note < 14.5 && 10.5 <= note ? toR = "<span style='background-color:yellow'>Moyenne</span>" :
                note < 10.5 && 6 <= note ? toR = "<span style='background-color:orange'>Médiocre</span>" : toR = "<span style='background-color:red'>Mauvaise</span>"
    return toR
}

const onEachZoneBio = (feature, layer) => {
    layer.bindPopup("<center><h1>Exploitation biologique</h1><img style='width:100%;'src='./src/assets/bio.jpeg'/><p>Type de culture :" + feature.properties.LBL_CULTU + "</p><p>Surface : " + feature.properties?.SURFACE_HA + " hectares</p></center>");
}

const onEachFermeBio = (feature, layer) => {
    layer.bindPopup("<center><h1>Ferme</h1><img style='width:50%;'src='./src/assets/farm1.png'/><p>Nom : " + feature.properties.Nom + "</p><p>Ville " + feature.properties.Ville + "<p> Adresse: " + feature.properties.Address + "</p>" + "<p> Produits: " + feature.properties.Produits + "</p>" + "</p><a target=_blank href='" + feature.properties.Location + "'>lien maps<a></center>");
}

const onEachRiviere = (feature, layer) => {
    layer.bindPopup("<center><h1>Rivière</h1><img style='width:50%;'src='./src/assets/river1.png'/><p>Libelle : " + feature.properties.Libelle + "</p><p>Commune:  " + feature.properties.Commune + "<p> Localisation: " + feature.properties.Localisation + "</p>" + "<p> Resultat: " + feature.properties.Resultat + "  " + calculateRiverNote(feature.properties.Resultat) + "</p>" + "<p> <a href='http://adour-garonne.eaufrance.fr'>Ressource</a></p>");
}

const onEachPollusol = (feature, layer) => {
    layer.bindPopup("<center><h1>Zone polluée</h1><img style='width:100%;'src='./src/assets/pollu1.png'/><p>Description : " + feature.properties.descript + "</p></center>");
}

const onEachZoneIndus = (feature, layer) => {
    layer.bindPopup("<center><h1>Installation industrielle</h1><img style='width:50%;'src='./src/assets/indus1.png'/><p>Type d'industrie : " + feature.properties.lib_naf + "</p><p>Seveso : " + feature.properties.lib_seveso + "</p><a target=_blank href='" + feature.properties.url_fiche + "'>Cliquer pour plus d'infos<a></center>");
}

const customMarkerFermeBio = (feature, latlng) => {
    return L.marker(latlng, { icon: fermesBioIcon })
}

const customMarkerRiviere = (feature, latlng) => {
    return L.marker(latlng, { icon: rivieresIcon })
}

const customMarkerPollusol = (feature, latlng) => {
    return L.marker(latlng, { icon: pollusolIcon })
}

const customMarkerZonesIndus = (feature, latlng) => {
    return L.marker(latlng, { icon: zonesIndusIcon })
}

const Map = () => {
    const navigate = useNavigate()
    const [display, setDisplay] = useState({
        zonesBio:false,
        fermesBio:false,
        rivieres:false,
        pollusol:false,
        indus:false,
    })

    const [userMarkersRadius, setUserMarkersRadius] = useState(3000)
    const [placementActivated, setPlacementActivated] = useState(false)

    return (
        <>
            <Stack id="mappage" direction={'row'} h={'100vh'}>
                <MapContainer preferCanvas={true} style={{ zIndex: 1, height: '100vh', width: '100%' }} center={[43.606214, 2.241295]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {display.zonesBio && <GeoJSON data={zonesBio} color='green' onEachFeature={onEachZoneBio}></GeoJSON>}
                    {display.rivieres && <GeoJSON data={rivieres} pointToLayer={customMarkerRiviere} onEachFeature={onEachRiviere}></GeoJSON>}
                    {display.fermesBio && <GeoJSON data={fermesBio} pointToLayer={customMarkerFermeBio} onEachFeature={onEachFermeBio}></GeoJSON>}
                    {display.indus && <GeoJSON data={zonesIndus} pointToLayer={customMarkerZonesIndus} onEachFeature={onEachZoneIndus}></GeoJSON>}
                    {
                        display.pollusol && <> <GeoJSON data={pollusol} color='red' onEachFeature={onEachPollusol}></GeoJSON>
                            <GeoJSON data={pollusolPoints} pointToLayer={customMarkerPollusol} onEachFeature={onEachPollusol}></GeoJSON>
                        </>
                    }

                    <AddMarker radius={userMarkersRadius} placementActivated={placementActivated} />
                </MapContainer>


                <Stack gap={4} p={'8'} paddingLeft={'6'} w={'lg'} zIndex={2} overflowY='auto'>
                    <Heading cursor={'pointer'} onClick={() => navigate('/')} fontWeight={'black'}>GeoBeeo</Heading>
                    <Stack gap={2}>
                        <Heading fontSize={'lg'}>Poser un marqueur</Heading>
                        <Stack>
                            <Text fontSize={'sm'}>Rayon de {userMarkersRadius} m</Text>
                            <Slider defaultValue={3000} min={500} max={6000} step={100} onChange={(val) => { setUserMarkersRadius(val) }} colorScheme={'bee'}>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb boxSize={6}>
                                    <Icon as={BiRadar} />
                                </SliderThumb>
                            </Slider>
                        </Stack>
                        <Stack direction={'row'}>
                            <Button size={'sm'} onClick={() => setPlacementActivated(curr => !curr)} variant={placementActivated ? 'outline' : 'solid'} colorScheme={'green'}>
                                {placementActivated ? 'Bloquer la pose de marqueurs' : 'Activer la pose de marqueurs'}
                            </Button>
                        </Stack>
                    </Stack>
                    <Divider></Divider>
                    <Heading fontSize={'lg'}>Sélection des calques</Heading>
                    <Calques setDisplay={setDisplay}/>

                </Stack>

            </Stack>
        </>
    )
}

export default Map;