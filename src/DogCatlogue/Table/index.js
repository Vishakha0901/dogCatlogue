import React from "react";
import style from "./style.module.css";
import ShimmerTable from "./shimmerTable";

const Table = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
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

            <tbody>
              {data.map((item,index) => (
                <tr key={index}>
                  <td>{item.breeds[0].name}</td>
                  <td>
                    {item.breeds[0].bred_for
                      ? item.breeds[0].bred_for
                      : "Sheep herding"}
                  </td>
                  <td>
                    {item.breeds[0].breed_group
                      ? item.breeds[0].breed_group
                      : "Herding"}
                  </td>
                  <td>{item.breeds[0].life_span}</td>
                  <td>
                    {item.breeds[0].temperament
                      ? item.breeds[0].temperament
                      : "Aloof, Reserved, Intelligent, Quiet	"}
                  </td>
                  <td>
                    {item.breeds[0].reference_image_id
                      ? item.breeds[0].reference_image_id
                      : "rkVlblcEQ"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ShimmerTable />
      )}
    </>
  );
};

export default Table;
