import React from "react";
import { 
    Box, Center,
    Grid,FormControl, Input, FormHelperText, IconButton, HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"

function MySearchBar() {

    return (
        <Box>
            <FormControl>
                <HStack>
                    <Input type='search' />
                    <IconButton 
                        aria-label='Search database'
                        colorScheme='green'
                        icon={<SearchIcon />} 
                    />
                </HStack>
            </FormControl>
        </Box>
    );
}

export default MySearchBar;