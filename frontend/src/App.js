import logo from './logo.svg';
import NormalBid from './normalAuction/normalBid';
import TimeCheck from './normalAuction/timeCheck';
import './App.css';

function App() {
  return (
    <div className="App">
      <p>실행완료</p>
      <NormalBid ></NormalBid>
      <TimeCheck></TimeCheck>
    </div>
  );
}

export default App;
