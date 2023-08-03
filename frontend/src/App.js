
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

function App() {
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
        </Routes>
      </div>
      <footer>
          <Footer></Footer>
        </footer>
    </Router>




  );
}

export default App;