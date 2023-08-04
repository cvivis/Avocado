import React from "react"
import { Link } from "react-router-dom";

function Home() {
  return (
      <div>
        <h2>홈 화면</h2> 
        <button>
          <Link to="/member/MyPage">마이페이지</Link>
        </button>
      </div>
  );
}

export default Home;
