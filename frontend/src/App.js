import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import BroadcastList from './component/live/board/broadcastList';
import LiveAuctionList from './component/live/board/LiveAuctionList';
import BroadcastingLiveAuctions from './component/live/board/BroadcastingLiveAuctions';
import {Link} from "react-router-dom";


function App() {
  return (
    
    <Router>
      <div>안녕</div>
      <div>
        <button ><Link to ="live/list">이동</Link></button>
      </div>
      <div className="App">
        <Routes>
          <Route path ="/live/list" element={<BroadcastList/>}></Route>
          <Route path = "/live/list/:id" element={<LiveAuctionList></LiveAuctionList>}></Route>
          <Route path = "/live/list/:id/info" element={<BroadcastingLiveAuctions></BroadcastingLiveAuctions>}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
