import React from "react";
import {
    Box,
    FormControl, Input, InputLeftElement, InputGroup,
    Grid, Center,
} from "@chakra-ui/react";
import {
    EmailIcon,
} from '@chakra-ui/icons'
import MyPasswordInput from "../../common/MyPasswordInput";

function LogIn(){

    return (
        <Box display="flex" justifyContent="space-between">
        <Grid>
            <Center></Center>
            <FormControl>
                <InputGroup size='md'>
                    <InputLeftElement pointerEvents='none'>
                        <EmailIcon color='gray.300' />
                    </InputLeftElement>
                    <Input
                        placeholder='아이디'
                    />
                </InputGroup>
                <MyPasswordInput></MyPasswordInput>
            </FormControl>
            <Center></Center>
        </Grid>
        </Box>
    );
}

export default LogIn;