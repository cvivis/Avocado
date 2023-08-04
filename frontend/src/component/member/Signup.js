import { useDispatch, useSelector } from "react-redux";
import { setEmail, setNickname, setPassword } from "../../redux/signupSlice";
import api from "../../api";

function Signup() {

    const dispatch = useDispatch();
    const email = useSelector((state)=>state.signup.email);
    const password = useSelector((state)=>state.signup.password);
    const nickname = useSelector((state)=>state.signup.nickname);
    
    const handleSignup = () => {
        // 사용자 입력값을 서버로 전송하는 함수
        const data = {
          email: email,
          password: password,
          nickname: nickname,
        };
    
        api.post('/member/signup', data)
          .then(response => {
            console.log('회원가입 성공:', response.data);
          })
          .catch(error => {
            console.error('회원가입 실패:', error);
            if(error.response?.status === 400){
                alert("이미 사용 중인 이메일 입니다.");
            }


          });
      };

    return (
      <div>
          <input type="text" placeholder="아이디를 입력하세요"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}/>
          <input type="password" placeholder="비밀번호"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}/>
          {/* <input type="password" placeholder="비밀번호 확인"/> */}
          <input type="text" placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => dispatch(setNickname(e.target.value))}/>
          <button onClick={handleSignup}>회원가입</button>
      </div>
    );
  }
  
  export default Signup;
  