import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.css";
import Table from "./Table";
import CardShimmer from "./cardShimmer";

const DogCatlogue = () => {
  const [data, setData] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [start, setStart] = useState(0);

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -500,
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 500,
      });
    }
  };

  function prevPage() {
    if (pageNum >= 1) {
      setPageNum(pageNum - 1);
    }
    if (pageNum == start && pageNum >= 1) {
      setStart((prev) => prev - 1);
    }
  }
  function nextPage() {
    setPageNum(pageNum + 1);
    if (pageNum + 1 >= 5) {
      setStart((prev) => prev + 1);
    }
  }
  function focusClick(item) {
    setPageNum(start + item - 1);
  }

  useEffect(() => {
    fetch(
      `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${pageNum}&limit=10`,
      {
        headers: {
          "x-api-key":
            "live_GhXL2pki6pFpAKEfE69Ddrr8AJBlF6kog2F0BNYBbYSloX9FXmcolr1mXK5Ni8QN",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        if (pageNum == 0) {
          setCarouselData(res);
        }
      })
      .catch((error) => console.log(error));
  }, [pageNum]);

  return (
    <div className={style.pageWrapper}>
      <div style={{ marginBottom: "50px" }}>
        <div className={style.tableWrapper}>
          <Table data={data} />
        </div>

        {data.length > 0 && (
          <div className={style.footerOuterDiv}>
            <div className={style.footerWrapper}>
              <div onClick={prevPage}>
                <span className={`${style.footerArrow} ${style.left}`} />
              </div>
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (item,index) => (
                  <div
                    onClick={() => focusClick(item)}
                    className={`${
                      pageNum + 1 == start + item && style.highlighCircle
                    } ${style.pageNumPointer}`}
                    key={index}
                  >
                    {start + item}
                  </div>
                )
              )}

              <div onClick={nextPage}>
                <span className={`${style.footerArrow} ${style.right}`} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className={style.headingWrapper}>
          <div>
            <div className={style.heading}>Dog Breeds</div>
            <div className={style.subHeading}>Everyday is a Dog Day</div>
          </div>
          <div>
            <div className={style.container} onClick={scrollLeft}>
              <div className={style.circle}>
                {" "}
                <div className={`${style.arrow} ${style.left}`}></div>
              </div>
            </div>
            <div className={style.container} onClick={scrollRight}>
              <div className={style.circle}>
                {" "}
                <div className={`${style.arrow} ${style.right}`}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.wrapper} ref={carouselRef}>
          {carouselData.length > 0 ? (
            carouselData.map((item, index) => (
              <div key={index} className={style.cardWrapper}>
                <img
                  src={item.url}
                  alt="image"
                  className={style.imageWrapper}
                />
                <div style={{ padding: "20px" }}>
                  <div className={style.rowWrapper}>
                    <div className={style.heading}>{item.breeds[0].name}</div>
                    <div className={style.subHeading}>
                      {item.breeds[0].temperament}
                    </div>
                  </div>

                  <div className={style.subHeading}>
                    <span className={style.text}>Life Span :</span>{" "}
                    {item.breeds[0].life_span
                      ? item.breeds[0].life_span
                      : "Farm dog, Cattle herding"}{" "}
                  </div>
                  <div className={style.subHeading}>
                    {item.breeds[0].bred_for
                      ? item.breeds[0].bred_for
                      : item.breeds[0]?.breed_group}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <CardShimmer />
          )}
        </div>
      </div>
    </div>
  );
};

export default DogCatlogue;
