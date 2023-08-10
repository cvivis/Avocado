import React,{useEffect} from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setMyNormalBids } from "../../redux/myNormalBidsSlice";
import {
    Card, CardBody, CardFooter,
    Image, Heading, Text,
    Button, Box,
} from '@chakra-ui/react';

function MyNormalBids(){
    const dispatch=useDispatch();
    const myNormalBids = useSelector((state) => state.myNormalBids.myNormalBids);
    const accessToken= useSelector((state)=> state.login.accessToken);

    useEffect(()=>{
        api.get('/items/my-bid', { headers: { Authorization: accessToken } })
        .then(response=>{
            dispatch(setMyNormalBids(response.data.entries));
        })
        .catch(error=>{
            console.error('API 요청 에러: ',error);
            
        });
    },[]);

    return (
        <div>
            
            {myNormalBids.map((mybid)=>(
                <div key = {mybid.itemId}>
                    <Box w={300}>
        <Card align='center'>
            <CardBody>
            <Image 
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
            />
            <Heading size='md'>{mybid.name}</Heading>
            <Text>{mybid.category}</Text>
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
                </div>
            ))}
       
        </div>
    )
}
export default MyNormalBids;