import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { resetLoginForm, setIsLogin, setEmail, setPassword, setMember } from "../../redux/loginSlice";

function Login() {

  // 로그인 성공시 페이지 이동을 위한 navigate
  const navigate = useNavigate();
  // 로그인 후 input값 초기화
  const dispatch = useDispatch();

  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  const isLogin = useSelector((state) => state.login.isLogin);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetLoginForm());
  //   }
  // }, [dispatch]);

  const handleLogin = (e) => {
    
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    api.post('/member/login', loginData)
      .then(response => {
        const token = response.headers.authorization;
        // 토큰을 쿠키에 저장
        document.cookie = `token=${token}; path=/;`;

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
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="아이디를 입력하세요"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))} />
        <input type="password" placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))} />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;