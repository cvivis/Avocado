import { useDispatch, useSelector } from "react-redux";
import { resetSignupForm, setEmail, setNickname, setPassword } from "../../redux/signupSlice";
import { useNavigate } from 'react-router-dom';
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
    <div>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="아이디를 입력하세요"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))} />
        <input type="password" placeholder="비밀번호"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))} />
        {/* <input type="password" placeholder="비밀번호 확인"/> */}
        <input type="text" placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => dispatch(setNickname(e.target.value))} />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
