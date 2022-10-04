import { Link, Select, Stack, Switch, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Calques = ({ display,  setDisplay, setOnlyTarn }) => {
    return (
        <Stack gap={2}>
            <Select onChange={(e) => setOnlyTarn(curr => !curr)} focusBorderColor={'bee.300'} size={'md'}>
                <option value='tarn'>Tarn</option>
                <option value='occitanie'>Occitanie</option>
            </Select>
            <Stack align='flex-start'>
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
        </Stack>
    )
}

export default Calques;