
// import logo from './logo.svg';
// import './App.css';

import Home from './Home';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Detail from './component/normal/board/Detail';
import SearchList from './component/normal/board/SearchList';
import BoardList from './component/normal/board/BoardList';
import CategoryList from './component/normal/board/CategoryList';
import MyPage from './component/member/MyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/normal/list/search/:keyword" element = {<SearchList/>}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/normal/list" element={<BoardList />}></Route>
          <Route path="/normal/detail/:id" element={<Detail />}></Route>
          <Route path="/normal/list/sort-category" element={<CategoryList />}></Route>
          <Route path="/member/myPage" element={<MyPage />}></Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;