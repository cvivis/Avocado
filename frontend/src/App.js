
// import logo from './logo.svg';
// import './App.css';

import Home from './components/home'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Detail from './components/normal/board/detail';
import Search from './components/normal/board/search';
import BoardList from './components/normal/board/boardlist';

function App() {
  return (
    <Router>
      <div className="App">
        실행완료
        <Search></Search>
        <div className="nav-btn">
        
          <button>
            <Link to="/normal/list"> 사용자 리스트 </Link>
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/normal/list" element={<BoardList />}></Route>
          <Route path="/normal/detail/:id" element={<Detail />}></Route>
        
        </Routes>
      </div>
    </Router>

  );
}

export default App;