import React, { useEffect, useState } from "react";
import "./Track.scss";
import Modal from "@mui/material/Modal";
import TrackModal from "../TrackModal/TrackModal";
import { nextSong, prevSong, playPause } from "../../app/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

function Track() {
  const [vol, setVol] = useState(100);
  const [openModal, setOpenModal] = useState(false);
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    // dispatch(playPause(false));

    // if (!shuffle) {
    //   dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    // } else {
    //   dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    // }
    if (!shuffle) {
      const nextIndex = (currentIndex + 1) % currentSongs.length;
      dispatch(nextSong(nextIndex));
      if (nextIndex === currentSongs.length - 1) {
        dispatch(playPause(false)); // Stop playback if all songs are done
      }
    } else {
      const randomIndex = Math.floor(Math.random() * currentSongs.length);
      dispatch(nextSong(randomIndex));
      if (randomIndex === currentSongs.length - 1) {
        dispatch(playPause(false)); // Stop playback if all songs are done
      }
    }
  };

  const handlePrevSong = () => {
    // if (currentIndex === 0) {
    //   dispatch(prevSong(currentSongs.length - 1));
    // } else if (shuffle) {
    //   dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    // } else {
    //   dispatch(prevSong(currentIndex - 1));
    // }
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      const randomIndex = Math.floor(Math.random() * currentSongs.length);
      dispatch(prevSong(randomIndex));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  console.log("isplaying", isPlaying);

  const setSliders = () => {
    // To show value - grey for unselected and white for selected part
    //  --slider-color: changes according to hover
    const sliders = document.querySelectorAll(".slider");
    sliders.forEach((slider) => {
      const min = slider.min,
        max = slider.max,
        value = slider.value;
      var percentage = ((value - min) / (max - min)) * 100;
      slider.style.background = `linear-gradient(to right, var(--slider-color) 0%, var(--slider-color) ${percentage}%, #ffffff66 ${percentage}%, #ffffff66 100%)`;
    });
  };

  const setTrackSliderSize = () => {
    // To change width of track slider dynamically
    const trackSlider = document.querySelector(
      ".track .track-player .song-slider"
    );
    trackSlider.style.width = `${Math.max(196, window.innerWidth / 2.8)}px`;
  };

  const handleModalClick = () => {
    const track = document.querySelector(".track");
    if (window.innerWidth < 540) {
      track.onclick = () => setOpenModal(true);
    } else {
      track.onclick = null;
    }
  };

  useEffect(() => {
    setSliders();
    setTrackSliderSize();
    handleModalClick();

    window.addEventListener("resize", () => {
      setTrackSliderSize();
      handleModalClick();
    });
  });
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(playPause(true));
  };

  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="track">
      <div className="track-left">
        <MusicPlayer
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
        <img
          className="banner"
          // src="https://upload.wikimedia.org/wikipedia/en/2/27/...Ready_for_It%3F_-_Taylor_Swift.png"
          src={activeSong.thumbnail}
          alt=""
        />
        <div className="song">
          <h5 className="song-title">
            <a href="">{activeSong.title}</a>
          </h5>
          <p className="song-artist">
            <a href="">Taylor Swift</a>
          </p>
        </div>
        <span className="icon">
          <ion-icon name="heart-outline"></ion-icon>
        </span>
      </div>

      <div className="track-player">
        <div className="controls">
          <div className="icon">
            <ion-icon name="shuffle-outline"></ion-icon>
          </div>
          <div className="icon">
            <ion-icon name="play-skip-back" onClick={handlePrevSong}></ion-icon>
          </div>
          <div className="icon play-btn">
            {isPlaying ? (
              <ion-icon
                name="pause-circle"
                onClick={() => dispatch(playPause(false))}
              ></ion-icon>
            ) : (
              <ion-icon
                name="play-circle"
                onClick={() => dispatch(playPause(true))}
              ></ion-icon>
            )}
          </div>
          <div className="icon">
            <ion-icon
              name="play-skip-forward"
              onClick={handleNextSong}
            ></ion-icon>
          </div>
          <div className="icon">
            <ion-icon name="repeat-outline"></ion-icon>
          </div>
        </div>
        <div className="progress-bar">
          <p className="current-time">
            {appTime === 0 ? "0:00" : getTime(appTime)}
          </p>
          <div className="song-slider">
            <input
              type="range"
              className="slider"
              value={appTime}
              name="song-time"
              id="song-time"
              min={0}
              max={duration}
              onInput={(event) => setSeekTime(event.target.value)}
            />
          </div>
          <p className="stop-time">
            {appTime === 0 ? "0:00" : getTime(duration)}
          </p>
        </div>
      </div>

      <div className="track-right">
        <span className="icon menu">
          <ion-icon name="ellipsis-horizontal"></ion-icon>
        </span>
        <span className="icon">
          <ion-icon name="musical-note-outline"></ion-icon>
        </span>
        <span className="icon">
          <ion-icon name="layers-outline"></ion-icon>
        </span>
        <span className="icon">
          <ion-icon name="laptop-outline"></ion-icon>
        </span>
        <span className="icon">
          {volume === 0 && <ion-icon name="volume-off-outline"></ion-icon>}
          {volume <= 0.3 && <ion-icon name="volume-low-outline"></ion-icon>}
          {volume > 0.3 && volume <= 0.7 && (
            <ion-icon name="volume-medium-outline"></ion-icon>
          )}
          {volume > 0.7 && <ion-icon name="volume-high-outline"></ion-icon>}
        </span>
        <span className="volume">
          <input
            type="range"
            className="slider"
            name="volume"
            id="volume"
            min={0}
            max={100}
            // onInput={(event) => {
            //   setVolume(event.target.value);
            //   setSliders();
            // }}
            onChange={(event) => setVolume(event.target.value / 100)}
            value={volume * 100}
            setVolume={setVolume}
          />
        </span>
      </div>

      <div className="track-right-mob">
        <span className="icon">
          <ion-icon name="heart-outline"></ion-icon>
        </span>
        <span className="icon">
          <ion-icon name="play"></ion-icon>
        </span>

        <Modal
          className="track-modal-container"
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <TrackModal />
        </Modal>
      </div>
    </div>
  );
}

export default Track;
