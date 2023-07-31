// import logo from './logo.svg';
// import './App.css';
import BoardList from './Components/Normal/Board/boardlist';
import Home from './Components/home'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Detail from './Components/Normal/Board/detail';
import Search from './Components/Normal/Board/search';

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