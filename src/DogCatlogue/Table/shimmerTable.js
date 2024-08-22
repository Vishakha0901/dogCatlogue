import React from "react";
import style from "./style.module.css";

const ShimmerTable = () => {
  return (
    <div className={style.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Breed Name</th>
            <th>Bred For</th>
            <th>Breed Group</th>
            <th>Life Span</th>
            <th>Temperament</th>
            <th>Origin</th>
          </tr>
        </thead>
      </table>

      {Array.from({ length: 10 }).map((_, index) => (
        <div className={style.shimmer} key={index}></div>
      ))}
    </div>
  );
};

export default ShimmerTable;
