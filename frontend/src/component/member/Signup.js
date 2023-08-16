import React from "react";
import {
  Box,
  FormControl, Input, InputLeftElement, InputGroup,
  Grid, Center, VStack, Button, Text, Container,
} from "@chakra-ui/react";
import {
  EmailIcon, SunIcon, LockIcon,
} from '@chakra-ui/icons'
import MyPasswordInput from "../../common/MyPasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { resetSignupForm, setEmail, setNickname, setPassword } from "../../redux/signupSlice";
import { useNavigate, Link } from 'react-router-dom';
import api from "../../api";
import { useEffect } from "react";
function Signup() {
  // 회원가입 성공시 페이지 이동을 위한 navigate
  const navigate = useNavigate();
  // 회원가입 후 input값 초기화
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signup.email);
  const password = useSelector((state) => state.signup.password);
  const nickname = useSelector((state) => state.signup.nickname);

  useEffect(() => {
    return () => {
      dispatch(resetSignupForm());
    }
  }, [dispatch]);


  const handleSignup = (e) => {
    e.preventDefault();

    // 사용자 입력값을 서버로 전송하는 함수
    const data = {
      email: email,
      password: password,
      nickname: nickname,
    };
    console.log(data);

    api.post('/member/signup', data)
      .then(response => {
        alert("회원가입을 축하드립니다");
        navigate('/member/login');
      }

      )
      .catch(error => {
        console.error('회원가입 실패:', error);
        alert("ID 중복");



      });
  };


  return (
    <Grid>
      <Container centerContent>
        <VStack mt={150}>
          <Box mb={50}>
            <Link to="/">
              <img src={`${process.env.PUBLIC_URL}/아보카도.png`} alt="Logo" />
            </Link>
          </Box>
          <FormControl mt={50} >
            <InputGroup size='lg'>
              <InputLeftElement pointerEvents='none'>
                <EmailIcon color='gray.300' />
              </InputLeftElement>
              <Input
                placeholder='이메일'
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
              />
            </InputGroup>
            <InputGroup size='lg'>
              <InputLeftElement pointerEvents='none'>
                <SunIcon color='gray.300' />
              </InputLeftElement>
              <Input
                value={nickname}
                onChange={(e) => dispatch(setNickname(e.target.value))}
                placeholder='닉네임'
              />
            </InputGroup>
            {/* 비밀번호 입력 인풋 */}
            <InputGroup size='lg'>
              <InputLeftElement pointerEvents='none'>
                <LockIcon color='gray.300' />
              </InputLeftElement>
              <Input value={password}
                type="password"
                onChange={(e) =>
                  dispatch(setPassword(e.target.value))} placeholder={'비밀번호'}
              />
            </InputGroup>
            {/* <MyPasswordInput MyPlaceholder={'비밀번호 확인'}></MyPasswordInput> */}
            <Button
              onClick={handleSignup}
              mt={10}
              colorScheme='green'
              type='submit'
              size='lg'
              w='500px'
            >
              <Text>회 원 가 입</Text>
            </Button>
          </FormControl>
        </VStack>
      </Container>
    </Grid>
  );
}

export default Signup;