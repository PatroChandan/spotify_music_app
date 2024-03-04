import React, { useEffect, useState } from "react";
import "./AlbumList.scss";
import Navbar from "../Navbar/Navbar";
import RectCard from "../RectCard/RectCard";
import { useSelector } from "react-redux";

const AlbumList = ({ image, title, songsData }) => {
  const selectdata = useSelector((state) => state.player.currentSongs);
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  /* Navbar - background changes with scroll */
  useEffect(() => {
    const scrollContainer = document.querySelector(".home"),
      navbar = document.querySelector(".navbar");

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", () => {
        let scroll = scrollContainer.scrollTop;
        let opacity = scroll / 200;
        navbar.style.background = `rgba(29, 13, 70, ${opacity})`;
      });
    }
  });

  /* Responsive Style */
  let [cardNum, setCardNum] = useState(6);

  const getCardsNum = () => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (width > 1500) {
      setCardNum(6);
    } else if (width > 1300) {
      setCardNum(5);
    } else if (width > 972) {
      setCardNum(4);
    } else if (width > 772) {
      setCardNum(3);
    } else if (width > 540) {
      setCardNum(2);
    } else {
      setCardNum(0);
    }
  };

  useEffect(() => {
    getCardsNum();
    window.addEventListener("resize", () => {
      getCardsNum();
    });
  }, []);
  console.log("selected data", selectdata);
  return (
    <div className="home">
      <div className="home-inside">
        <Navbar home={true} />

        <div className="home-container">
          <section className="section-1" key={0}>
            <div className="recte-card">
              <div className="rect-card-left">
                <img
                  src={selectdata.thumbnail || selectdata[0].thumbnail}
                  alt=""
                />
              </div>
              <div className="rect-card-right">
                <h1>{selectdata.title || selectdata[0].title}</h1>
              </div>
            </div>
          </section>
          <section
            className="section-2"
            key={0}
            style={{ marginBottom: "10px" }}
          >
            <div className="ul-card">
              <div className="rect-card-left">
                <ul>
                  <li>#</li>
                  <li style={{ flexGrow: "4" }}>Title</li>
                </ul>
              </div>
              <div className="rect-card-right">
                <ul style={{ display: "flex", justifyContent: "flex-end" }}>
                  <li>Favourite</li>
                  <li>Duration</li>
                </ul>
              </div>
            </div>
          </section>
          <section
            className="section-2"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {selectdata.length > 1 ? (
              selectdata?.map((item, indx) => (
                <RectCard
                  key={indx}
                  id={item._id}
                  title={item.title}
                  image={item.thumbnail}
                  link={item.link}
                  heart={true}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                />
              ))
            ) : (
              <RectCard
                key={"1"}
                id={selectdata._id}
                title={selectdata.title || selectdata[0].title}
                image={selectdata.thumbnail || selectdata[0].thumbnail}
                link={selectdata.link}
                herart={true}
                isPlaying={isPlaying}
                activeSong={activeSong}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AlbumList;
