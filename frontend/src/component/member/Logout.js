import api from "../../api";
import { setIsLogin } from "../../redux/loginSlice";

function logout(dispatch) {
    api.post('/member/logout')
        .then(() => {
            // 쿠키에서 토큰 제거
            document.cookie = `token=; path=/; max-age=0`;
            dispatch(setIsLogin(false));
        })
        .catch(error => {
            console.error('로그아웃 실패:', error);
        });
}

export default logout;