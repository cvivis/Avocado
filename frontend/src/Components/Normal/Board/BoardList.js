import React, {useEffect,useState} from "react";
import api from '../../../api';



// Dto가 객체로 넘어오니까 배열로 감싸야함
function BoardList() {
    const [boardLists, setBoardLists] = useState([]);
    useEffect(() => {
      // API 호출
      api.get("/normal/list")
      .then(response => {
        setBoardLists(response.data.entries); // entries를 가져오도록 수정
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
    }, []);

    console.log(boardLists);

  
    return (
      <ul>
        <li>
          <table>
            <thead>
              <tr>
                <th>아이디</th>
                <th>상품명</th>
              </tr>
            </thead>
            <tbody>
              {boardLists.map((boardList) => (
                <tr key={boardList.id}>
                  <td>{boardList.id}</td>
                  <td>{boardList.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
            {/* <Link to={`/normal/${boardList.id}`}>{boardList.name}</Link> */}
        </li>
      </ul>
      
    );
  }
  export default BoardList;
