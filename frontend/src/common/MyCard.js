import {
    Card, CardBody, CardFooter,
    Image, Heading, Text,
    Button, Box,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";

function MyCard(props) {

    return (
        
        <Box w={300}>
        <Card align='center'>
            <CardBody>
            <Image 
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
            />
            <Heading size='md'>{props.props.name}</Heading>
            </CardBody>
            <CardFooter>
                <Text>
                    {props.props.type}
                </Text>
            </CardFooter>
        </Card>
        </Box>
    )
}

export default MyCard;