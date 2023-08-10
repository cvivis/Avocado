import {
    Card, CardBody, CardFooter,
    Image, Heading, Text,
    Button, Box,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";

function MyCard() {



    return (
        <Box w={300}>
        <Card align='center'>
            <CardBody>
            <Image 
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
            />
            <Heading size='md'>닌텐도</Heading>
            <Text>간단 상품 설명</Text>
            </CardBody>
            <CardFooter>
                <Button colorScheme="green" >
                    <Link to="/normal/auctionPage/NormalDetailPage">
                        상세보기(임시)
                    </Link>
                </Button>
            </CardFooter>
        </Card>
        </Box>
    )
}

export default MyCard;