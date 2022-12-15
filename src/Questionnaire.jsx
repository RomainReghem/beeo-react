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
                
                <Heading fontWeight={'black'}>Proposer des données</Heading>
                <Stack>
                    <Text>Donnez un titre</Text>
                    <Input placeholder="Aa" />
                </Stack>
                <Stack>
                    <Text>Décrivez nous brièvement ce que représentent ces données</Text>
                    <Input placeholder="Aa" />
                </Stack>
                <Stack w={'100%'} align='center' justify={'center'} py='10' border={'1px black dashed'}>
                    <Text>Glissez vos données ici !</Text>
                </Stack>
                <Button onClick={() => navigate('/')} colorScheme={'green'}>Envoyer</Button>
            </Stack>
        </Center>
    )
}

export default Questionnaire;