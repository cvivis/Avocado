import { useSelector } from "react-redux";
import api from "../../api";
import { setIsLogin } from "../../redux/loginSlice";

function Logout(dispatch) {
    const accessToken = useSelector((state) => state.login.accessToken);
    const isLogin = useSelector((state) => state.login.isLogin);
    console.log(isLogin);
    console.log(accessToken);
    console.log(typeof(accessToken));
    api.post('/member/logout'
        , {
            headers: {
                Authorization: `${accessToken}`,
        },
            
        })
        .then(() => {
            // 쿠키에서 토큰 제거
            // document.cookie = `token=; path=/; max-age=0`;
            console.log("로그아웃 되었습니다.");
            dispatch(setIsLogin(false));
        })
        .catch(error => {
            console.error('로그아웃 실패:', error);
        });
}

export default Logout;