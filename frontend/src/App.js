
// import logo from './logo.svg';
// import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from './component/normal/board/Detail';
import BoardList from './component/normal/board/BoardList';
import CategoryList from './component/normal/board/CategoryList';
import MyPage from './component/member/MyPage';
import NormalBidPage from './component/normal/auctionPage/NormalBidPage';
import LogIn from './component/member/LogIn';
// // import NormalBid from './component/normal/auction/normalBid';
// import Header from './common/Header';
// import Footer from './common/Footer';

function App() {
  const nowPrice = 10000;
  const nowBidName = "홍길동";

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/normal/list" element={<BoardList />}></Route>
            <Route path="/normal/detail/:id" element={<Detail />}></Route>
            <Route path="/normal/list/sort-category" element={<CategoryList />}></Route>
            <Route path="/member/myPage" element={<MyPage />}></Route>
            <Route path="/normal/auctionPage/NormalBidPage" element={<NormalBidPage />}></Route>
            <Route path="/member/LogIn" element={<LogIn />}></Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;