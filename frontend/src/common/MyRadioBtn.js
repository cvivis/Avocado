import { React } from "react";
import {
    Box, HStack, useRadio, useRadioGroup, Text, Spacer,
} from "@chakra-ui/react";

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
const { getInputProps, getRadioProps } = useRadio(props)

const input = getInputProps()
const checkbox = getRadioProps()

return (
    <Box as='label'>
    <input {...input} />
    <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
        bg: 'green.400',
        color: 'black',
        borderColor: 'none',
        }}
        _focus={{
        boxShadow: 'none',
        }}
        px={5}
        py={2}
    >
        {props.children}
    </Box>
    </Box>
)
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function MyRadioBtn() {
const options = ['상시 경매','라이브 경매']

const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'type',
    defaultValue: '상시 경매',
    onChange: console.log, // 로그 찍힘
})

const group = getRootProps()

return (
    <HStack {...group}>
    {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
        <RadioCard key={value} {...radio}>
            <Text as={'b'}>{value}</Text>
        </RadioCard>
        )
    })}
    </HStack>
)
}

export default MyRadioBtn;