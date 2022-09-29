import { Button, Center, Heading, IconButton, Input, Radio, RadioGroup, SlideFade, Stack, Text } from "@chakra-ui/react"
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
    const navigate = useNavigate()
    return (
        <Center gap={2} flexDirection={'column'} p={4} minH={'100%'} bgImage={'url(https://www.wallpaperup.com/uploads/wallpapers/2013/02/14/40146/a0594c187bca3b801c2f108e2741967a.jpg)'}>
            <Stack gap={4} align={'start'} boxShadow={'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;'} p={'8'} bg={'#F7FFE0'} >
                <IconButton onClick={() => navigate('/')} colorScheme={'bee'} icon={<FontAwesomeIcon icon={faHome} />}/>
                <Heading fontWeight={'black'}>Questionnaire d'utilisabilité</Heading>
                <Stack>
                    <Text>Avez-vous trouvé le site facile d'utilisation ?</Text>
                    <RadioGroup>
                        <Stack spacing={5} direction='row'>
                            <Radio colorScheme='green' value='1'>Oui</Radio>
                            <Radio colorScheme='yellow' value='2'>Non</Radio>
                        </Stack>
                    </RadioGroup>
                </Stack>
                <Stack>
                    <Text>Avez-vous trouvé ce que vous cherchiez sur le site ?</Text>
                    <RadioGroup>
                        <Stack spacing={5} direction='row'>
                            <Radio colorScheme='green' value='1'>Oui</Radio>
                            <Radio colorScheme='yellow' value='2'>Non</Radio>
                        </Stack>
                    </RadioGroup>
                </Stack>
                <Stack>
                    <Text>Pourriez-vous dessiner un rayon du rayon 4000m sur la carte ?</Text>
                    <RadioGroup>
                        <Stack spacing={5} direction='row'>
                            <Radio colorScheme='green' value='1'>Oui</Radio>
                            <Radio colorScheme='yellow' value='2'>Non</Radio>
                        </Stack>
                    </RadioGroup>
                </Stack>
                <Stack>
                    <Text>Si vous avez des suggestions, écrivez les ici :</Text>
                    <Input placeholder="Aa" />
                </Stack>
                <Button onClick={() => navigate('/')} colorScheme={'green'}>Envoyer</Button>
            </Stack>
        </Center>
    )
}

export default Questionnaire;