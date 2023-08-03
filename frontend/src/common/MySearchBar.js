import React from "react";
import { 
    Box, Center,
    Grid,FormControl, Input, FormHelperText, IconButton, HStack, Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"

function MySearchBar() {

    return (
        <Box>
            <FormControl>
                <HStack>
                    <Select placeholder='카테고리' width='auto'>
                        <option value='ALL'>전체</option>
                        <option value='ELECTRIC'>전자 기기</option>
                    </Select>
                    <Input type='search' 
                        color='green'
                        placeholder='검색어를 입력하세요'
                        _placeholder={{ color: 'inherit' }}
                        htmlSize={30} 
                        width='auto'
                    />
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