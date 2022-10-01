import { Button, Center, Heading, Stack, Text } from "@chakra-ui/react"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    return (
        <Center id="homepage" flexDirection={'column'} p={8} h={'100vh'} bgImage={'url(https://www.wallpaperup.com/uploads/wallpapers/2013/02/14/40146/a0594c187bca3b801c2f108e2741967a.jpg)'}>
            <Stack pr={2} maxW={'xl'} overflowY='auto'>
                <Stack align={'start'} boxShadow={'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;'} p={'8'} bg={'#F7FFE0'} >
                    <Heading fontWeight={'black'}>Beeo</Heading>
                    <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                    <Button onClick={() => navigate('/map')} colorScheme={'green'}>Accéder à l'application</Button>
                </Stack>
                <Stack align={'start'} boxShadow={'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;'} p={'8'} bg={'#F7FFE0'} >
                    {/* <Heading fontWeight={'bold'}>Questionnaire</Heading> */}
                    <Heading fontSize={'xl'}>Mise à jour x.x - React</Heading>
                    <Text>Passage d'Angular à React <br /> Modernisation de l'interface</Text>
                </Stack>
                <Stack align={'start'} boxShadow={'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;'} p={'8'} bg={'#F7FFE0'} >
                    {/* <Heading fontWeight={'bold'}>Questionnaire</Heading> */}
                    <Heading fontSize={'xl'}>Mise à jour x.x - Questionnaire</Heading>
                    <Text>Questionnaire d'utilisabilité disponible</Text>
                    <Button onClick={() => navigate('/questionnaire')} colorScheme={'green'}>Répondre</Button>
                </Stack>
            </Stack>
        </Center>

    )
}

export default Home;