import React, { useEffect, useState } from "react";
import "./RectCard.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useApi from "../../utils/useApi";

function RectCard({ title, id, image, link, heart, isPlaying, activeSong }) {
  // const { activeSong } = useSelector((state) => state.player);
  const [isLiked, setIsLiked] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const { data: favoritesData } = useApi("/music/favorites/like");
  console.log("favData", favoritesData);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
    if (
      favoritesData &&
      favoritesData.songs &&
      favoritesData.songs.some((i) => i._id === id)
    ) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favoritesData, likedSongs, id]);

  const handleHeartClick = async (id) => {
    // Toggle liked state when the heart icon is clicked
    const token = localStorage.getItem("spotify-token");

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/favorites/like${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "f104bi07c490",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ songId: id }),
        }
      );
      const res = await response.json();
      console.log("fav", res);
      if (res.status === "success") {
        // toast.success(res.message, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        setLikedSongs((prevLikedSongs) =>
          prevLikedSongs.includes(id)
            ? prevLikedSongs.filter((_id) => _id !== id)
            : [...prevLikedSongs, id]
        );
        setIsLiked(!isLiked);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error while liking:", error);
      toast.error("An error occurred while processing your request.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleBtn = () => {};
  return (
    <div className="rect-card">
      <div className="rect-card-left">
        <img src={image} alt="" />
      </div>
      <div className="rect-card-right">
        <h4>{title}</h4>
        {heart && (
          <ion-icon
            name={isLiked ? "heart" : "heart-outline"}
            className="heart-icon"
            style={{ color: isLiked ? "red" : "inherit" }}
            onClick={() => handleHeartClick(id)}
          ></ion-icon>
        )}
        <button className="play-btn" onClick={handleBtn}>
          {isPlaying && activeSong.title === title ? (
            <ion-icon name="pause-circle"></ion-icon>
          ) : (
            <ion-icon name="play-circle"></ion-icon>
          )}
        </button>
      </div>
    </div>
  );
}

export default RectCard;
