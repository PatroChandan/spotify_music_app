import React from "react";
import "./Card.scss";
import { useDispatch } from "react-redux";
import { setActiveSong, playPause } from "../../app/playerSlice";
import { useNavigate } from "react-router-dom";

function Card({
  title,
  subtitle,
  image,
  artist,
  song,
  isPlaying,
  activeSong,
  data,
  i,
}) {
  const dispatch = useDispatch();
  // const { isPlaying } = useSelector((state) => state.player);
  const navigate = useNavigate();

  const handlePlayBtn = (e) => {
    e.stopPropagation();
    dispatch(playPause(false));
  };
  // console.log("data", data);
  const handleCard = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
    navigate("/AlbumList");
  };
  return (
    <div className="card" onClick={handleCard}>
      <div className={`image ${artist && "artist"}`}>
        <img src={image} alt="" />
        <div className="play-btn" onClick={handlePlayBtn}>
          {isPlaying && activeSong.title === song.title ? (
            <ion-icon name="pause-circle"></ion-icon>
          ) : (
            <ion-icon name="play-circle"></ion-icon>
          )}
        </div>
      </div>
      <div className="text">
        <h4 className="card-title">{title}</h4>
        <h5 className="card-subtitle">{subtitle}</h5>
      </div>
    </div>
  );
}

export default Card;
