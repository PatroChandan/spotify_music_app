import React, { useEffect, useState } from "react";
import "./Favourite.scss";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import RectCard from "../../components/RectCard/RectCard";
import useApi from "../../utils/useApi";
import { BACKEND_URL } from "../../utils/backendUrl";

const Favourite = () => {
  const selectdata = useSelector((state) => state.player.currentSongs);
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  //   const { data: favoritesData } = useApi("/music/favorites/like");
  const [likedSongs, setLikedSongs] = useState([]);
  const [favoritesData, setFavoritesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("spotify-token");
        const response = await fetch(BACKEND_URL + "/music/favorites/like", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            projectId: "f104bi07c490",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const result = await response.json();
        setFavoritesData(result.data);
        // console.log("res", result);
      } catch (error) {
        console.error("Error have done on Favorites:", error);
      }
    };

    fetchData();
  }, [likedSongs]);
  console.log("favoritesData", favoritesData);

  useEffect(() => {
    const storedLikedSongs = localStorage.getItem("likedSongs");
    if (storedLikedSongs) {
      setLikedSongs(JSON.parse(storedLikedSongs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

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
                  src={
                    "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="rect-card-right">
                <h1>Favourites</h1>
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
            {favoritesData?.songs?.map((item, indx) => (
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
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
