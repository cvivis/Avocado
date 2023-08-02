
// import logo from './logo.svg';
// import './App.css';

import Home from './Home';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Detail from './component/normal/Board/Detail';
import SearchList from './component/normal/Board/SearchList';
import BoardList from './component/normal/Board/BoardList';
import CategoryList from './component/normal/Board/CategoryList';

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
        </Routes>
      </div>
    </Router>

  );
}

export default App;