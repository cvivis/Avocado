
// import logo from './logo.svg';
// import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from './component/normal/board/Detail';
import BoardList from './component/normal/board/BoardList';
import CategoryList from './component/normal/board/CategoryList';

// import NormalBid from './component/normal/auction/normalBid';
import Header from './common/Header';
import Footer from './common/Footer';
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

function App() {
  // const nowPrice = 10000;
  // const nowBidName = "홍길동";

  return (

    <Router>
      <div>
        <header>
          <Header></Header>
        </header>


      </div>
      <div className="App">

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/normal/list" element={<BoardList />}></Route>
          <Route path="/normal/detail/:id" element={<Detail />}></Route>
          <Route path="/normal/list/sort-category" element={<CategoryList />}></Route>
          <Route path="/member/login" element={<Login />}></Route>
          <Route path="/member/signup" element={<Signup />}></Route>
          <Route path="/member/myPage" element={<MyPage />}></Route>
          <Route path="/normal/auctionPage/NormalBidPage" element={<NormalBidPage />}></Route>
          <Route path="/broadcastList" element={<BroadcastList />}></Route>
          <Route path="/broadcast" element={<Broadcast />}></Route>
          <Route path="/member/logout" element={<Logout />}></Route>
          <Route path="/member/Regist" element={<Regist />}></Route>
          <Route path="/normal/auctionPage/NormalDetailPage" element={<NormalDetailPage />}></Route>
          <Route path="/member/Consign" element={<Consign />}></Route>
          <Route path="/broadcastTest" element={<BroadcastTest />}></Route>
        </Routes>
      </div>
      {/* <footer>
        <Footer></Footer>
      </footer> */}
    </Router>
  );
}

export default App;