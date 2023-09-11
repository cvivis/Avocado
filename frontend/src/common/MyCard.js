import {
    Card, CardBody, CardFooter,
    Image, Heading, Text,
    Button, Box,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";

function MyCard(props) {
    function status(itemStatus) {
        let desc = "";
        if(itemStatus === "CONSIGN") desc = "물품 요청 대기 중"
        else if(itemStatus === "APPROVE") desc = "물품 배정 대기 중"
        else if(itemStatus === "ASSIGN") desc = "경매 확정"
        else if(itemStatus === "REJECT") desc = "물품 반려"
        else if(itemStatus === "SUCCESS") desc = "낙찰된 상품"
        else if(itemStatus === "FAIL") desc = "유찰된 상품"
        return (
            desc
        )
    }
    return (
        
        <Box w={300}>
            <Card align='center'>
                <CardBody>
                    <Image 
                        objectFit='cover'
                        src= {props.props.url}
                        alt='Chakra UI'
                    />
                    <Heading size='md'>{props.props.name}({props.props.type})</Heading>
                    
                   
                    {props.props.currentBid ? 
                        <Text>
                            현재최고가 : {props.props.currentBid}원
                        </Text>
                    : null}

                    {props.props.myBid ? 
                        <Text>
                            내입찰가 : {props.props.myBid}원
                        </Text>
                    : null}

                    {props.props.successBidPrice ? 
                        <Text>
                            낙찰가 : {props.props.successBidPrice}원
                        </Text>
                    : null}
                   
                    <Text>
                        {status(props.props.status)}
                    </Text>
                </CardBody>
                {/* <CardFooter>
                    
                </CardFooter> */}
            </Card>
        </Box>
    )
}

export default MyCard;