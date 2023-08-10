import React from "react";
import {
  Box,
  FormControl, Input, InputLeftElement, InputGroup,
  Grid, Center, VStack, Button, HStack, Divider, SimpleGrid, Text,
  Container,
} from "@chakra-ui/react";
import {
  EmailIcon,
} from '@chakra-ui/icons'
import MyPasswordInput from "../../common/MyPasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
import { setIsLogin, setEmail, setPassword, setMember, setAccessToken, setRole } from "../../redux/loginSlice";

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);

  const handleLogin = (e) => {

    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    api.post('/member/login', loginData)
      .then(response => {
        const token = response.headers.authorization;
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];

        const decodedPayload = atob(encodedPayload); // Base64 디코딩

        const payloadObject = JSON.parse(decodedPayload);

        const role = payloadObject.authority;
        dispatch(setRole(role));
        dispatch(setAccessToken(token));
        dispatch(setIsLogin(true));
        dispatch(setMember(response.data));

        alert(`${loginData.email}님 반갑습니다.`);
        navigate('/');

      })
      .catch(error => {
        console.error('로그인 실패:', error);
        alert("로그인 정보가 일치하지 않습니다.");
      });
  }

  return (
    <Grid>
      <Container centerContent>
        <VStack>
          <Box mt={50}>
            <Link to="/">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1n2KE9iWPb_CKLzQ3adFwE9aPfJrOXMXYn1lFo8&s" alt="Logo"></img>
            </Link>
          </Box>
          <FormControl mt={50}>
            <InputGroup size='lg'>
              <InputLeftElement pointerEvents='none'>
                <EmailIcon color='gray.300' />
              </InputLeftElement>
              <Input
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder='이메일'
              />
            </InputGroup>
            <MyPasswordInput MyPlaceholder={'비밀번호'} value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}></MyPasswordInput>
            <Button
              onClick={handleLogin}
              mt={10}
              colorScheme='green'
              type='submit'
              size='lg'
              w='500px'
            >
              <Text>로 그 인</Text>
            </Button>
            <SimpleGrid>
              <HStack>
                <Center w='500px' mt={"3"}>
                  <Button background={"white"} size={"sm"} w='200px' variant="link">
                    <Link to="/member/signup">
                      <Text>회원 가입</Text>
                    </Link>
                  </Button>
                  <Divider orientation='vertical' border="1px solid" borderColor='green' height="10px" />
                  <Button background={"white"} size={"sm"} w='200px' variant="link">
                    <Text>아이디 찾기</Text>
                  </Button>
                  <Divider orientation='vertical' border="1px solid" borderColor='green' height="10px" />
                  <Button background={"white"} size={"sm"} w='200px' variant="link">
                    <Text>비밀번호 찾기</Text>
                  </Button>
                </Center>
              </HStack>
            </SimpleGrid>
          </FormControl>
        </VStack>
      </Container>
    </Grid>
  );
}

export default LogIn;
