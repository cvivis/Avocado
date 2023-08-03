import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../../../api';
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "./CategoryList";
import SearchList from "./SearchList";
import { setBoardLists, setInitialLists } from "../../../redux/boardListSlice";

function BoardList() {
  const dispatch = useDispatch();
  const boardLists = useSelector((state) => state.boardList.boardLists);

  useEffect(() => {
    api.get("/normal/list")
      .then(response => {
        dispatch(setBoardLists(response.data.entries));
        dispatch(setInitialLists(response.data.entries));
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  }, [dispatch]);

  return (
    <div>
      <CategoryList />
      <SearchList />
      <ul>
        {boardLists.map((item) => (
          <li key={item.itemId}>
            <Link to={`/normal/detail/${item.itemId}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
