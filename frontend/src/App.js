/* eslint-disable */
// import logo from './logo.svg';
// import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from './component/normal/board/Detail';
import BoardList from './component/normal/board/BoardList';
import CategoryList from './component/normal/board/CategoryList';
import OnlineMeeting from "./component/openvidu/OnlineMeeting"

// import NormalBid from './component/normal/auction/normalBid';
import Login from './component/member/Login';
import Signup from './component/member/Signup';
import MyPage from './component/member/MyPage';
import NormalBidPage from './component/normal/auctionPage/NormalBidPage';
import BroadcastList from './component/live/auction/BroadcastList';
import Broadcast from './component/live/auction/Broadcast';
import Logout from "./component/member/Logout"
// import loginDesign from './component/member/loginDesign';
import Regist from './component/member/Regist';
import NormalDetailPage from './component/normal/auctionPage/NormalDetailPage';
import Consign from './component/member/Consign';
import BroadcastTest from './component/live/auction/BroadcastTest';
// // import NormalBid from './component/normal/auction/normalBid';
// import Header from './common/Header';
// import Footer from './common/Footer';
import AdminPage from './component/admin/admin'
// 테스트용
import LiveAuctionPage from './component/live/board/LiveAuctionPage';
import MainLayout from './common/MainLayout';

// 폰트
import './Fonts/font.css';
import { toBeDisabled } from '@testing-library/jest-dom/matchers';

function App() {
  // const nowPrice = 10000;
  // const nowBidName = "홍길동";
  console.warn = console.error = () => {};
// or IIFE
(() => { console.warn = console.error = () => {}} )();

  return (

    <Router>
      <div className="App">
        <Routes>
          {/* 헤더, 푸터를 적용 할 컴포넌트 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/normal/list" element={<BoardList />}></Route>
            <Route path="/normal/detail/:id" element={<Detail />}></Route>
            <Route path="/normal/list/sort-category" element={<CategoryList />}></Route>
            <Route path="/member/myPage" element={<MyPage />}></Route>
            {/* <Route path="/broadcastList" element={<BroadcastList />}></Route> */}
            <Route path="/broadcast" element={<Broadcast />}></Route>
            <Route path="/live/list" element={<BroadcastList></BroadcastList>}></Route>
            <Route path="/liveAuctionpage" element={<LiveAuctionPage />}></Route>
            <Route path="/member/Consign" element={<Consign />}></Route>
          </Route>
          {/* 헤더, 푸터를 적용하지 않을 컴포넌트 */}
          <Route path="/openvidu" element={<OnlineMeeting />}></Route>
          <Route path="/member/login" element={<Login />}></Route>
          <Route path="/member/signup" element={<Signup />}></Route>
          <Route path="/member/logout" element={<Logout />}></Route>
          
          <Route path="/broadcastTest" element={<BroadcastTest />}></Route>
          {/* <Route path="/normal/auctionPage/NormalBidPage" element={<NormalBidPage />}></Route> */}
          {/* <Route path="/member/Regist" element={<Regist />}></Route> */}
          {/* <Route path="/normal/auctionPage/NormalDetailPage" element={<NormalDetailPage />}></Route> */}
          <Route path="/member/Consign" element={<Consign />}></Route>
          <Route path="/broadcastTest" element={<BroadcastTest />}></Route>
          {/* <Route path="/live/list" element={<BroadcastList></BroadcastList>}></Route> */}
          <Route path="/liveAuctionpage" element={<LiveAuctionPage />}></Route>
          <Route path="/adminPage" element={<AdminPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;