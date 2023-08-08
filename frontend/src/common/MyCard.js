import {
    Card, CardBody, CardFooter,
    Image, Heading, Text,
    Button, Box,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function MyCard(props) {
    // const filterList = useSelector((state) => state.boardList.filterList);
    const { item } = props;
    // console.log(item.itemId+"아이디");
    // console.log(item.name+"이름");
    // console.log(item.content+"내용");
    return (
        <Box w={300}>
            <Card align='center'>
                <CardBody>
                    <Image
                        objectFit='cover'
                        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Chakra UI'
                    />
                    <Heading size='md'>{item.name}</Heading>
                    <Text>{item.content}</Text>
                </CardBody>
                <CardFooter>
                    <Button colorScheme="green" >
                        <Link to={`/normal/detail/${item.itemId}`}>{item.itemId}</Link>
                    </Button>
                </CardFooter>
            </Card>
        </Box>
    )
}

export default MyCard;