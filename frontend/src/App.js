
// import logo from './logo.svg';
// import './App.css';

import Home from './component/home'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Detail from './component/normal/board/detail';
import SearchList from './component/normal/board/SearchList';
import BoardList from './component/normal/board/boardList';
import CategoryList from './component/normal/board/CategoryList';

function App() {
  return (
    <Router>
      <div className="App">
        실행완료
        <SearchList></SearchList>
        <CategoryList></CategoryList>
        <div className="nav-btn">
        
          <button>
            <Link to="/normal/list"> 사용자 리스트 </Link>
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/normal/list" element={<BoardList />}></Route>
          <Route path="/normal/detail/:id" element={<Detail />}></Route>
          <Route path="/normal/list/sort-category" element={<CategoryList />}></Route>
        
        </Routes>
      </div>
    </Router>

  );
}

export default App;