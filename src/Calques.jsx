import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Heading, Highlight, Link, Select, Stack, Switch, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Calques = ({ display, setDisplay, setDpt, dpt, getData }) => {

    const dpt_table = { 
        zbio: ['81'],
        eol: ['30', '34', '11', '66', '12'],
        pollu:['46', '34', '12', '32', '11', '31', '09', '82', '48', '30', '66', '81', '65'],
        inci:['34', '31', '82', '30', '66'],
    }

    return (
        <Stack gap={2}>
            <Select onChange={(e) => setDpt(e.target.value)} rounded='sm' focusBorderColor={'bee.500'} size={'md'}>
                <option value='1'>Occitanie</option>
                <option value='81'>Tarn</option>
                <option value='09'>Ariège</option>
                <option value='11'>Aude</option>
                <option value='12'>Aveyron</option>
                <option value='30'>Gard</option>
                <option value='31'>Haute-Garonne</option>
                <option value='32'>Gers</option>
                <option value='34'>Hérault</option>
                <option value='46'>Lot</option>
                <option value='48'>Lozère</option>
                <option value='65'>Hautes-Pyrénées</option>
                <option value='66'>Pyrénées-Orientales</option>
                <option value='82'>Tarn-et-Garonne</option>
            </Select>
            <Accordion defaultIndex={[]} allowMultiple>
                {/* Zones Bio */}
                <AccordionItem border={'0px'}>
                    <Stack align={'center'} direction={'row'}>
                        <Switch isChecked={display.zbio} onChange={(e) => getData('zbio', e.target.checked)} colorScheme='bee' />
                        <Heading>
                            <AccordionButton>
                                Zones bios
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                    </Stack>
                    <AccordionPanel pb={4}>
                        <Text fontSize={'sm'}>Correspond aux parcelles en Agriculture Biologique (AB) déclarées à la PAC.<br />
                            <Link fontSize={'sm'} color='blue.500' href='https://www.data.gouv.fr/fr/datasets/parcelles-en-agriculture-biologique-ab-declarees-a-la-pac/' isExternal>
                                source <ExternalLinkIcon mx='1px' />
                            </Link>
                        </Text>
                    </AccordionPanel>
                </AccordionItem>

                {/* Fermes bio */}
                <AccordionItem border={'0px'}>
                    <Stack align={'center'} direction={'row'}>
                        <Switch isChecked={display.fbio} onChange={(e) => getData('fbio', e.target.checked)} colorScheme='bee' />
                        <Heading>
                            <AccordionButton>
                                Fermes bio
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                    </Stack>
                    <AccordionPanel pb={4}>
                        <Text fontSize={'sm'}>Correspond aux fermes bio avec leur emplacement exact.<br />
                            <Link fontSize={'sm'} color='blue.500' href='https://annuaire.agencebio.org/' isExternal>
                                source <ExternalLinkIcon mx='1px' />
                            </Link>
                        </Text>
                    </AccordionPanel>
                </AccordionItem>

                {/* Pollusol */}
                <AccordionItem border={'0px'}>
                    <Stack align={'center'} direction={'row'}>
                        <Switch isChecked={display.pollu} onChange={(e) => getData('pollu', e.target.checked)} colorScheme='bee' />
                        <Heading>
                            <AccordionButton>
                                Zones polluées
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                    </Stack>
                    <AccordionPanel pb={4}>
                        <Text fontSize={'sm'}>Correspond aux sites et sols pollués (ou potentiellement pollués) appelant une action des pouvoirs publics, à titre préventif ou curatif (ex BASOL).<br />
                            <Link fontSize={'sm'} color='blue.500' href='https://www.georisques.gouv.fr/donnees/bases-de-donnees/sites-et-sols-pollues-ou-potentiellement-pollues' isExternal>
                                source <ExternalLinkIcon mx='1px' />
                            </Link>
                        </Text>
                    </AccordionPanel>
                </AccordionItem>

                {/* Indus */}
                <AccordionItem border={'0px'}>
                    <Stack align={'center'} direction={'row'}>
                        <Switch isChecked={display.indus} onChange={(e) => getData('indus', e.target.checked)} colorScheme='bee' />
                        <Heading>
                            <AccordionButton>
                                Installations industrielles
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                    </Stack>
                    <AccordionPanel pb={4}>
                        <Text fontSize={'sm'}>Correspond aux Installations classées pour la protection de l'environnement (ICPE) soumises à autorisation ou à enregistrement (en construction, en fonctionnement ou en cessation d'activité)<br />
                            <Link fontSize={'sm'} color='blue.500' href='https://www.georisques.gouv.fr/donnees/bases-de-donnees/installations-industrielles' isExternal>
                                source <ExternalLinkIcon mx='1px' />
                            </Link>
                        </Text>
                    </AccordionPanel>
                </AccordionItem>

                {/* Rivières */}
                <AccordionItem border={'0px'}>
                    <Stack align={'center'} direction={'row'}>
                        <Switch isChecked={display.riv} onChange={(e) => getData('riv', e.target.checked)} colorScheme='bee' />
                        <Heading>
                            <AccordionButton>
                                Qualité des rivières
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                    </Stack>
                    <AccordionPanel pb={4}>
                        <Text fontSize={'sm'}>Correspond aux qualité des rivières avec l'emplacement de la station de mesure.<br />
                            <Link fontSize={'sm'} color='blue.500' href='http://adour-garonne.eaufrance.fr/' isExternal>
                                source <ExternalLinkIcon mx='1px' />
                            </Link>
                        </Text>
                    </AccordionPanel>
                </AccordionItem>

                {/* Eoliennes */}
                <AccordionItem border={'0px'}>
                    <Stack align={'center'} direction={'row'}>
                        <Switch isChecked={display.eol} onChange={(e) => getData('eol', e.target.checked)} colorScheme='bee' />
                        <Heading>
                            <AccordionButton>
                                Eoliennes
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                    </Stack>
                    <AccordionPanel pb={4}>
                        <Text fontSize={'sm'}>Correspond aux éoliennes composant les parcs éoliens terrestres<br />
                            <Link fontSize={'sm'} color='blue.500' href='https://www.georisques.gouv.fr/donnees/bases-de-donnees/eolien-terrestre' isExternal>
                                source <ExternalLinkIcon mx='1px' />
                            </Link>
                        </Text>
                        <Badge textTransform={'none'} colorScheme={'red'}>Attention, peut ne pas être à jour.</Badge>
                    </AccordionPanel>
                </AccordionItem>

                {/* Incinérateurs */}
                <AccordionItem border={'0px'}>
                    <Stack align={'center'} direction={'row'}>
                        <Switch isChecked={display.inci} onChange={(e) => getData('inci', e.target.checked)} colorScheme='bee' />
                        <Heading>
                            <AccordionButton>
                                Incinérateurs
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                    </Stack>
                    <AccordionPanel pb={4}>
                        <Text fontSize={'sm'}>Liste des incinérateurs d'ordures ménagères de la région Occitanie.<br />
                            <Link fontSize={'sm'} color='blue.500' href='https://catalogue.picto-occitanie.fr/geonetwork/srv/fre/catalog.search#/metadata/db30e1f2-cffc-435d-9029-f36640957992' isExternal>
                                source <ExternalLinkIcon mx='1px' />
                            </Link>
                        </Text>
                    </AccordionPanel>
                </AccordionItem>

                {/* Incinérateurs */}
                <AccordionItem border={'0px'}>
                    <Stack align={'center'} direction={'row'}>
                        <Switch isChecked={display.dechets} onChange={(e) => getData('dechets', e.target.checked)} colorScheme='bee' />
                        <Heading>
                            <AccordionButton>
                                Traitement des déchets
                                <AccordionIcon />
                            </AccordionButton>
                        </Heading>
                    </Stack>
                    <AccordionPanel pb={4}>
                        <Text fontSize={'sm'}>Localisation des installations de traitement de déchets résiduels en Occitanie en 2020. Il s'agit des Installations de Stockage de Déchets Non Dangereux (ISDND), des Unités d'Incinération des Ordures Ménagères (UIOM), les Unités de Valorisation Energétique (UVE),et les installations effectuant un Traitement Mécano-Biologique (TMB).<br />
                            <Link fontSize={'sm'} color='blue.500' href='https://catalogue.picto-occitanie.fr/geonetwork/srv/fre/catalog.search#/metadata/57734334-a78f-4cc5-8615-f96ce474312d' isExternal>
                                source <ExternalLinkIcon mx='1px' />
                            </Link>
                        </Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Stack>
    )
}

export default Calques;

{/* <Stack>
                <Stack direction='row' align={'center'} justify='start'>
                    <Switch isChecked={display.zonesBio} onChange={(e) => setDisplay(curr => ({ ...curr, zonesBio: e.target.checked }))} colorScheme='bee' />
                    <Text>Zones bios</Text>
                </Stack>
                <Text fontSize={'sm'}>Correspond aux parcelles en Agriculture Biologique (AB) déclarées à la PAC.<br />
                    <Link fontSize={'sm'} color='blue.500' href='https://www.data.gouv.fr/en/reuses/geographie-de-lagriculture-biologique-en-france/' isExternal>
                        source <ExternalLinkIcon mx='1px' />
                    </Link>
                </Text>

            </Stack>

            <Stack>
                <Stack direction='row' align={'center'}>
                    <Switch isChecked={display.fermesBio} onChange={(e) => setDisplay(curr => ({ ...curr, fermesBio: e.target.checked }))} colorScheme='bee' />
                    <Text>Fermes bio</Text>
                </Stack>
                <Text fontSize={'sm'}>Correspond aux fermes bio avec leur emplacement exact.<br />
                    <Link fontSize={'sm'} color='blue.500' href='https://annuaire.agencebio.org/' isExternal>
                        source <ExternalLinkIcon mx='1px' />
                    </Link>
                </Text>
            </Stack>

            <Stack>
                <Stack direction='row' align={'center'}>
                    <Switch isChecked={display.pollusol} onChange={(e) => setDisplay(curr => ({ ...curr, pollusol: e.target.checked }))} colorScheme='bee' />
                    <Text>Zones polluées</Text>
                </Stack>
                <Text fontSize={'sm'}>Correspond aux sites et sols pollués (ou potentiellement pollués) appelant une action des pouvoirs publics, à titre préventif ou curatif (ex BASOL).<br />
                    <Link fontSize={'sm'} color='blue.500' href='https://www.georisques.gouv.fr/' isExternal>
                        source <ExternalLinkIcon mx='1px' />
                    </Link>
                </Text>

            </Stack>

            <Stack>
                <Stack direction='row' align={'center'}>
                    <Switch isChecked={display.indus} onChange={(e) => setDisplay(curr => ({ ...curr, indus: e.target.checked }))} colorScheme='bee' />
                    <Text>Installations industrielles</Text>
                </Stack>
                <Text fontSize={'sm'}>Correspond aux Installations classées pour la protection de l'environnement (ICPE) soumises à autorisation ou à enregistrement (en construction, en fonctionnement ou en cessation d'activité)<br />
                    <Link fontSize={'sm'} color='blue.500' href='https://www.georisques.gouv.fr/' isExternal>
                        source <ExternalLinkIcon mx='1px' />
                    </Link>
                </Text>

            </Stack>

            <Stack>
                <Stack direction='row' align={'center'}>
                    <Switch isChecked={display.rivieres} onChange={(e) => setDisplay(curr => ({ ...curr, rivieres: e.target.checked }))} colorScheme='bee' />
                    <Text>Qualité des rivières</Text>
                </Stack>
                <Text fontSize={'sm'}>Correspond aux qualité des rivières avec l'emplacement de la station de mesure.<br />
                    <Link fontSize={'sm'} color='blue.500' href='http://adour-garonne.eaufrance.fr/' isExternal>
                        source <ExternalLinkIcon mx='1px' />
                    </Link>
                </Text>
            </Stack>

            <Stack>
                <Stack direction='row' align={'center'}>
                    <Switch isChecked={display.eoliennes} onChange={(e) => setDisplay(curr => ({ ...curr, eoliennes: e.target.checked }))} colorScheme='bee' />
                    <Text>Eoliennes</Text>
                </Stack>
                <Text fontSize={'sm'}>Correspond aux éoliennes composant les parcs éoliens terrestres<br />
                    <Link fontSize={'sm'} color='blue.500' href='https://www.georisques.gouv.fr/donnees/bases-de-donnees/eolien-terrestre' isExternal>
                        source <ExternalLinkIcon mx='1px' />
                    </Link>
                </Text>
            </Stack> */}