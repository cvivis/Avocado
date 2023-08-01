// import { Link } from 'react-router-dom';
// import { Router } from 'react-router-dom';
// import SearchList from './component/normal/board/SearchList';

import React from "react"
import { Link } from "react-router-dom";
import SearchList from "./component/normal/board/SearchList";
import { useSelector } from "react-redux";
import BoardList from "./component/normal/board/BoardList";
// import BoardList from "./component/normal/board/BoardList";
// import BoardList from "./component/normal/board/boardList";
// import { useSelector } from "react-redux";



function Home() {
  // state.search => 리듀서 이름
  // const searchResult = useSelector((state)=>state.search.searchResult);
  // const searchListsLength = useSelector((state)=>state.search.searchListsLength);
  const searchResults = useSelector((state) => state.search);
  return (
    
      <div>
        <h2>홈 화면</h2> 
        <input></input>
        <div className="nav-btn">
          {/* 검색 결과에 따라서 SearchList 또는 BoardList를 보여줍니다. */}
      {searchResults.length === 0 ? <BoardList /> : <SearchList />}
        
        <button>
          <Link to="/normal/list"> 사용자 리스트 </Link>
          
        </button>
        <button>
          <Link to="normal/list/sort-category"> 카테고리 </Link>
        </button>
      </div>

        
        
        {/* {searchListsLength === 0 ? <BoardList /> : <SearchList searchLists={searchResult} />} */}
      </div>
    
      
      
      
  );
}

export default Home;
