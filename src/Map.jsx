import { Badge, Button, Code, Divider, Heading, Icon, Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react"
import { MapContainer, TileLayer, GeoJSON, } from "react-leaflet";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react'
import axios from "./api/axios";
// Hooks
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// Icons
import { BiRadar } from 'react-icons/bi'
import { SearchIcon } from "@chakra-ui/icons";
// JS files
import Calques from "./Calques";
import AddMarker from "./AddMarker";
import LocationMarker from "./LocationMarker";
import SearchField from './SearchField'
import Flyer from "./Flyer";

import test from "./jsons/test_data.json"
const test_data = test.data

// Leaflet
import * as L from "leaflet";

// CHECK LEAFLET GLIFY

const calculateRiverNote = (note) => {
    let toR = ''
    note >= 17 ? toR = "<span style='background-color:rgb(69, 231, 118)'>Très bonne</span>" :
        note < 17 && 14.5 <= note ? toR = "<span style='background-color:rgb(113, 230, 253)'>Bonne</span>" :
            note < 14.5 && 10.5 <= note ? toR = "<span style='background-color:yellow'>Moyenne</span>" :
                note < 10.5 && 6 <= note ? toR = "<span style='background-color:orange'>Médiocre</span>" : toR = "<span style='background-color:red'>Mauvaise</span>"
    return toR
}

const onEach = (feature, layer, type) => {
    switch (type) {
        case 'riv': layer.bindPopup("<center><h1>Rivière</h1><img style='width:50%;'src='/river1.png'/><p>Libelle : " + feature.properties.libelle + "</p><p>Commune:  " + feature.properties.commune + "<p> Localisation: " + feature.properties.localisation + "</p>" + "<p> Resultat: " + feature.properties.resultat + "  " + calculateRiverNote(feature.properties.resultat) + "</p>" + "<p> <a href='http://adour-garonne.eaufrance.fr'>Ressource</a></p>");
            break;
        case 'zbio': layer.bindPopup("<center><h1>Exploitation biologique</h1><img style='width:100%;'src='/bio.jpeg'/><p>Type de culture :" + feature.properties.lbl_cultu + "</p><p>Surface : " + feature.properties?.surface_ha + " hectares</p></center>");
            break;
        case 'fbio': layer.bindPopup("<center><h1>Ferme</h1><img style='width:50%;'src='/farm1.png'/><p>Nom : " + feature.properties.nom + "</p><p>Ville " + feature.properties.ville + "<p> Adresse: " + feature.properties.address + "</p>" + "<p> Produits: " + feature.properties.produits + "</p>" + "</p><a target=_blank href='" + feature.properties.location + "'>lien maps<a></center>");
            break;
        case 'pollu': layer.bindPopup("<center><h1>Zone polluée</h1><img style='width:100%;'src='/pollu1.png'/><p>" + feature.properties.nom_site + "</p><p>Description : " + feature.properties.descript + "</p></center>");
            break;
        case 'indus': layer.bindPopup("<center><h1>Installation industrielle</h1><img style='width:50%;'src='/indus1.png'/><p>Entreprise:" + feature.properties.nom_ets + "</p><p>Type d'industrie : " + feature.properties.lib_naf + "</p><p>Seveso : " + feature.properties.lib_seveso + "</p><a target=_blank href='" + feature.properties.url_fiche + "'>Cliquer pour plus d'infos<a></center>");
            break;
        case 'eol': layer.bindPopup("<center><h1>Eolienne</h1></center>");
            break;
        case 'inci': layer.bindPopup(`<center><h1>Incinérateur</h1></center><p>Exploitant : ${feature.properties.exploitant}</p>`);
            break;
        case 'dechets': layer.bindPopup(`<center><h1>Traitement des déchets</h1></center><p>Service : ${feature.properties.nom_servic}</p><p>Exploitant : ${feature.properties.nom_exploi}</p>`);
            break;
    }
}

const customMarker = (e, icon) => {
    let latlng = [e.geometry.coordinates[1], e.geometry.coordinates[0]]
    return L.marker(latlng, { icon: icon })
}

// Data recovered from API
let layers_data = {
    indus: {}, fbio: {}, zbio: {}, riv: {}, pollu: {}, eol: {}, one: {}, inci: {}, corse: {}, dechets: {}
}

// Infos about the layers. Display is the name displayed in the search section. Color is the badge color in the search section
const eq_table = {
    zbio: { display: 'lbl_cultu', color: 'green.500', },
    fbio: { display: 'nom', color: 'green', icon: new L.Icon({ iconUrl: '/farm.png', iconSize: [36, 42] }) },
    indus: { display: 'nom_ets', color: 'red', icon: new L.Icon({ iconUrl: '/indus.png', iconSize: [36, 42] }) },
    riv: { display: 'libelle', color: 'blue', icon: new L.Icon({ iconUrl: '/river.png', iconSize: [36, 42] }) },
    pollu: { display: 'nom_site', color: 'red', icon: new L.Icon({ iconUrl: '/pollu.png', iconSize: [36, 42] }) },
    eol: { display: 'id_aerogenerateur', color: 'red', icon: new L.Icon({ iconUrl: '/wind.png', iconSize: [36, 42] }) },
    inci: { display: 'exploitant', color: 'red', icon: new L.Icon.Default },
    dechets: { display: 'nom_servic', color: 'red', icon: new L.Icon.Default }
}

const Map = () => {
    const [randomKey, setRandomKey] = useState(Math.floor(Math.random() * 999))
    const navigate = useNavigate()
    const [searchContent, setSearchContent] = useState('')
    const [searchResponse, setSearchResponse] = useState([])
    const [to, setTo] = useState()
    const [bounds, setBounds] = useState()
    const [display, setDisplay] = useState({
        zbio: false, fbio: false, riv: false, pollu: false, indus: false, eol: false, one: false, inci: false, corse: false, dechets: false
    })

    const getData = async (layer, checked) => {
        if (checked) {
            // We check if the object is empty. If it is, then we query the database, else we can just display the data.
            console.log(typeof dpt)
            // if (Object.keys(layers_data[layer]).length === 0) {
            layers_data[layer] = (await axios.get('/layers', { params: { layer: layer, dpt: dpt, bounds: bounds } })).data
            console.log(layers_data[layer])
            // }            
            setDisplay(curr => ({ ...curr, [layer]: true }))
            // setRandomKey(Math.floor(Math.random() * 999))
        } else setDisplay(curr => ({ ...curr, [layer]: false }))
    }

    const refreshZbio = async () => {
        await getData('zbio', display.zbio)
        setRandomKey(Math.floor(Math.random() * 999))
    }

    useEffect(() => {
    //refreshZbio()
    }, [bounds])

    const getOne = async (layer, id) => {
        setDisplay(curr => ({ ...curr, one: false }))
        layers_data.one = (await axios.get('/one', { params: { layer: layer, gid: id } })).data
        layers_data.one.layerName = layer
        console.log(layers_data)
        setDisplay(curr => ({ ...curr, one: true }))
    }

    const search = async () => {
        const response = await axios.get('/search', { params: { content: searchContent.toLowerCase() } })
        setSearchResponse(response.data)
    }

    useEffect(() => {
        if (searchContent.length > 2) {
            search()
        } else setSearchResponse([])
    }, [searchContent])

    // By default, only Tarn region.
    const [dpt, setDpt] = useState('1')

    useEffect(() => {
        layers_data = {
            indus: {}, fbio: {}, zbio: {}, riv: {}, pollu: {}, eol: {}, one: {}, inci: {}, corse: {}, dechets: {}
        }
        setDisplay({
            zbio: false, fbio: false, riv: false, pollu: false, indus: false, eol: false, inci: false, corse: false, dechets: false
        })
    }, [dpt])

    const [userMarkersRadius, setUserMarkersRadius] = useState(3000)
    const [placementActivated, setPlacementActivated] = useState(false)

    return (
        <>
            <Stack id="mappage" direction={['column', 'row']} h={'100vh'}>
                <MapContainer preferCanvas={true} style={{ zIndex: 1, height: '100vh', width: '100%' }} center={[43.606214, 2.241295]} zoom={13} scrollWheelZoom={true}>
                    <SearchField />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {display.zbio && layers_data.zbio.features && <GeoJSON key={randomKey} data={layers_data.zbio} color='green' onEachFeature={(f, l) => onEach(f, l, 'zbio')}></GeoJSON>}
                    {display.riv && layers_data.riv.features && <GeoJSON data={layers_data.riv} pointToLayer={(e) => customMarker(e, eq_table.riv.icon)} onEachFeature={(f, l) => onEach(f, l, 'riv')}></GeoJSON>}
                    {display.fbio && layers_data.fbio.features && <GeoJSON data={layers_data.fbio} pointToLayer={(e) => customMarker(e, eq_table.fbio.icon)} onEachFeature={(f, l) => onEach(f, l, 'fbio')}></GeoJSON>}
                    {display.indus && layers_data.indus.features && <GeoJSON data={layers_data.indus} pointToLayer={(e) => customMarker(e, eq_table.indus.icon)} onEachFeature={(f, l) => onEach(f, l, 'indus')}></GeoJSON>}
                    {display.one && layers_data.one.features && <GeoJSON data={layers_data.one} pointToLayer={(e) => customMarker(e, eq_table[layers_data.one.layerName].icon)} onEachFeature={(f, l) => onEach(f, l, layers_data.one.layerName)}></GeoJSON>}
                    {
                        display.pollu && layers_data.pollu.features && <> <GeoJSON data={layers_data.pollu} color='red' pointToLayer={(e) => customMarker(e, eq_table.pollu.icon)} onEachFeature={(f, l) => onEach(f, l, 'pollu')}></GeoJSON>
                            {/* <GeoJSON data={onlyTarn ? pollusolPoints : pollusolPointsOccitanie} pointToLayer={(e) => customMarker(e, eq_table.pollu.icon)} onEachFeature={(f, l) => onEach(f, l, 'pollu')}></GeoJSON> */}
                        </>
                    }
                    {display.eol && layers_data.eol.features && <GeoJSON data={layers_data.eol} pointToLayer={(e) => customMarker(e, eq_table.eol.icon)} onEachFeature={(f, l) => onEach(f, l, 'eol')}></GeoJSON>}
                    {display.inci && layers_data.inci.features && <GeoJSON data={layers_data.inci} onEachFeature={(f, l) => onEach(f, l, 'inci')}></GeoJSON>}
                    {display.corse && layers_data.corse.features && <GeoJSON data={layers_data.corse}></GeoJSON>}
                    {display.dechets && layers_data.dechets.features && <GeoJSON data={layers_data.dechets} onEachFeature={(f, l) => onEach(f, l, 'dechets')}></GeoJSON>}

                    <AddMarker radius={userMarkersRadius} placementActivated={placementActivated} />
                    <LocationMarker />
                    <Flyer to={to} setBounds={setBounds} />
                </MapContainer>


                <Stack ml={'0px !important'} w={['100%', 'xl']} zIndex={2} overflowY='auto'>
                    <Stack bg={'green.500'} p={'8'}>
                        <Heading color={'white'} cursor={'pointer'} onClick={() => navigate('/')} fontWeight={'black'}>GeoBeeo</Heading>
                    </Stack>
                    <Stack p={'8'} gap={4}>
                        <Stack>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<SearchIcon color='gray.300' />}
                                />
                                <Input onChange={(e) => setSearchContent(e.target.value)} focusBorderColor="green.500" rounded={'sm'} type='text' placeholder='Rechercher dans les calques' />
                            </InputGroup>
                            {Object.keys(searchResponse).length && <Stack marginTop={'0px !important'} p='2' border={'1px solid'} borderColor='gray.200' borderTop={'none'} roundedBottom='sm' maxH='200px' overflowY={'scroll'}>
                                {
                                    Object.keys(searchResponse).map(layer => {
                                        return searchResponse[layer].map(line => {
                                            return (
                                                <>
                                                    <Stack direction={'row'} align='center'
                                                        onClick={() => {
                                                            getOne(layer, line.gid);
                                                            setTo([line.st_asgeojson.coordinates[1], line.st_asgeojson.coordinates[0]])
                                                        }}
                                                        cursor='pointer'>
                                                        <Badge colorScheme={[eq_table[layer].color]} textTransform={'none'}>{layer}</Badge>
                                                        <Text noOfLines={1} textTransform={'lowercase'}>{line[eq_table[layer].display]}</Text>
                                                    </Stack>
                                                </>
                                            )
                                        })
                                    })
                                }
                            </Stack>}
                        </Stack>
                        <Stack gap={2}>
                            <Heading fontSize={'lg'}>Marqueurs</Heading>
                            <Stack>
                                <Text fontSize={'sm'}>{placementActivated ? 'Cliquez' : 'Activez la pose des marqueurs et cliquez'} sur la carte pour poser un marqueur de <Code fontFamily={'body'} colorScheme={'green'}>{userMarkersRadius}</Code>m de rayon</Text>
                                <Slider defaultValue={3000} min={500} max={6000} step={100} onChange={(val) => { setUserMarkersRadius(val) }} colorScheme={'green'}>
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
                        <Divider borderColor={'gray.400'}></Divider>
                        <Heading fontSize={'lg'}>Sélection des calques</Heading>
                        <Calques display={display} setDisplay={setDisplay} setDpt={setDpt} dpt={dpt} getData={getData} />
                    </Stack>
                </Stack>

            </Stack>
        </>
    )
}

export default Map;