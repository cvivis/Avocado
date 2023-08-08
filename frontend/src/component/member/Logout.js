import { useDispatch, useSelector } from "react-redux";
import api from "../../api";
import { setIsLogin } from "../../redux/loginSlice";
import { useEffect, useRef } from "react";
import { MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Logout() {

    const accessToken = useSelector((state) => state.login.accessToken);
    const stateIsLogin = useSelector((state) => state.login.isLogin);
    const isLogin = useRef(stateIsLogin);
    const dispatch = useDispatch();
    console.log(isLogin);
    console.log(accessToken);
    console.log(typeof (accessToken));

    const navigate = useNavigate();

    const handlelogout = () => {
        api.post('/member/logout', {}, { headers: { Authorization: accessToken } })
            .then(() => {
                // 쿠키에서 토큰 제거
                // document.cookie = `token=; path=/; max-age=0`;
                console.log("로그아웃 되었습니다.");
                alert("로그아웃 되었습니다.")
                dispatch(setIsLogin(false));
                navigate('/');


            })
            .catch(error => {
                console.error('로그아웃 실패:', error);
            })
    };



    return (
        <MenuItem onClick={handlelogout}>
            Log Out
        </MenuItem>
    )
}

export default Logout;