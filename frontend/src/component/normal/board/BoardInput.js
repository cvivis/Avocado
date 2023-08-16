// // export const 메서드 명= (넘길 객체) => ({
// //     type: "타입 명시 ex) SHOW_LIST",
// //     payload: 넘길 객체와 동일,
// //   });


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../../api";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchResults } from "../../../redux/searchSlice";

// function SearchList() {
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const dispatch = useDispatch();
//   const searchResults = useSelector((state) => state.search.searchLists);

//   const handleSearch = () => {     
//     // 검색 버튼 클릭 시 API 호출
//     api.get(`/normal/list/search/${searchKeyword}`)
//       .then(response => {
//         dispatch(setSearchResults(response.data.entries));
//       })
//       .catch(error => {
//         console.error('API 요청 에러:', error);
//       });
//   };

//   return (
//     <div>
//       <input 
//         type="search" 
//         placeholder="검색어를 입력하세요"
//         value={searchKeyword}
//         onChange={(e)=> setSearchKeyword(e.target.value)}
//       />
//       <button onClick={handleSearch}>검색</button>

      
//     </div>
//   );
// }

// export default SearchList;
