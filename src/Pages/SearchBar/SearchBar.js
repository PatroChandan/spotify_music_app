import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
import "./SearchBar.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { activeSong, isPlaying, searchSong } = useSelector(
    (state) => state.player
  );
  const location = useLocation();
  //   const { cardsData } = location.state.cardData;
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
  //   console.log("cards data see all", location.state.cardData);
  return (
    <div className="home">
      <div className="home-inside">
        <Navbar home={false} />

        {searchSong.length > 0 ? (
          <div className="home-container">
            {/* <section className="section-1">
              <div className="heading">
                <h1>Showing search results for {searchSong.searchText}</h1>
              </div>
            </section> */}

            <section>
              <div className="content">
                {searchSong.map((item, index) => (
                  <Card
                    key={item._id}
                    title={item.title}
                    subtitle={item.mood}
                    image={item.image || item.thumbnail}
                    artist={item.artist}
                    song={item}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={item}
                    i={index}
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="home-container">
            <section className="section-1">
              <div className="heading">
                <h1>Nothing to show here.</h1>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
