import React from "react";
import style from "./style.module.css";
const CardShimmer = () => {
  return (
    <div className={style.shimmerWrapper}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div className={style.shimmer} key={index}></div>
      ))}
    </div>
  );
};
export default CardShimmer;
