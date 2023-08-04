import React, { useState } from "react"
import {
    InputGroup, Input, InputRightElement, Button, InputLeftElement,
} from '@chakra-ui/react'
import {
    LockIcon, ViewIcon, ViewOffIcon,
} from '@chakra-ui/icons'

function MyPasswordInput(props) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='lg'>
        <InputLeftElement pointerEvents='none'>
            <LockIcon color='gray.300' />
        </InputLeftElement>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder={props.MyPlaceholder}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? <ViewOffIcon color='black' /> : <ViewIcon color='black' />}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
}

export default MyPasswordInput;