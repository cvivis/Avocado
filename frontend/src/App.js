// import logo from './logo.svg';
// import './App.css';
import BoardList from './Components/Normal/Board/BoardList';
import Home from './Components/Home'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
      실행완료
      
      <div className="nav-btn">

        <button>
          <Link to="/normal/list"> 사용자 리스트 </Link>
        </button>
      </div>

  
      <Routes>
        <Route path="/normal/list" element={<BoardList />}></Route>
      
        <Route path="/" element={<Home />}></Route>
      </Routes>

    
    </div>
    </Router>
  );
}

export default App;
