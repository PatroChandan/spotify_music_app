import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import RectCard from "../RectCard/RectCard";
import "./Home.scss";
import { topLists } from "../../database/data";
import useApi from "../../utils/useApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const navigate = useNavigate();

  const { data: albumData } = useApi("/music/album");
  const { data: featuredData } = useApi(
    `/music/song?filter={"featured":"Trending songs"}`
  );
  const { data: romaticData } = useApi(
    `/music/song?filter={"mood":"romantic"}`
  );
  const { data: excitedData } = useApi(`/music/song?filter={"mood":"excited"}`);
  const { data: happyData } = useApi(`/music/song?filter={"mood":"happy"}`);
  const { data: sadData } = useApi(`/music/song?filter={"mood":"sad"}`);

  const songsData = [
    { titleText: "Top album", cardsData: albumData },
    { titleText: "Trending songs", cardsData: featuredData },
    { titleText: "Romantic", cardsData: romaticData },
    { titleText: "Excited", cardsData: excitedData },
    { titleText: "Happy", cardsData: happyData },
    { titleText: "Sad", cardsData: sadData },
  ];
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

  const handleSeeAll = (cardsData, titleText) => {
    navigate("/SeeAll", {
      state: { titleText: titleText, cardData: cardsData },
    });
  };

  return (
    <div className="home">
      <div className="home-inside">
        <Navbar home={true} />

        <div className="home-container">
          <section className="section-1" key={0}>
            <div className="heading">
              <h1>Good evening</h1>
            </div>
            <div className="content">
              {topLists.slice(0, 6).map((list, index) => (
                <Link to={"/comming"} style={{ textDecoration: "none" }}>
                  <RectCard
                    key={index}
                    title={list.title}
                    image={list.image}
                    link={list.link}
                  />
                </Link>
              ))}
            </div>
          </section>

          {songsData.map((section, index) => (
            <section key={index + 1}>
              <div className="heading">
                <h2>
                  <a href="">{section.titleText}</a>
                </h2>
                <p
                  onClick={() =>
                    handleSeeAll(section.cardsData, section.titleText)
                  }
                >
                  <a href="">SEE ALL</a>
                </p>
              </div>
              <div className="content">
                {section.cardsData
                  .slice(0, cardNum || section.cardsData.length)
                  .map((item, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
