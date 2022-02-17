import React, { useState, useEffect } from "react";
import styles from "./PaginationStyles.module.scss";
const Pagination = ({ count, currPage, setCurrPage }) => {
  const [countArray, setCountArray] = useState([]);
  useEffect(() => {
    let counts = [];
    for (let i = 1; i <= count; i++) {
      counts.push(i);
    }
    setCountArray(counts);
  }, []);
  const onClick = (e, value) => {
    e.preventDefault();
    setCurrPage(value);
  };
  const handleClickPrev = (e) => {
    e.preventDefault();
    setCurrPage(currPage - 1);
  };
  const handleClickNext = (e) => {
    e.preventDefault();
    setCurrPage(currPage + 1);
  };
  return (
    <div className={styles["pagination"]}>
      {currPage !== 1 && (
        <a href="#" onClick={(e) => handleClickPrev(e)}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </a>
      )}

      {countArray.map((index, key) => (
        <a
          className={index == currPage ? styles["active"] : ""}
          onClick={(e) => onClick(e, index)}
          href="#"
          key={key}
        >
          {index}
        </a>
      ))}

      {currPage != count && (
        <a href="#" onClick={(e) => handleClickNext(e)}>
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
      )}
    </div>
  );
};

export default Pagination;
