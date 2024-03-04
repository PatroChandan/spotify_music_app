import React, { useRef, useEffect } from "react";

const MusicPlayer = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  //   const { activeSong, isPlaying } = useSelector((state) => state.player);
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);
  const audioUrl =
    activeSong?.audio_url ||
    (activeSong?.songs && activeSong.songs[0]?.audio_url);

  return (
    <audio
      // src={activeSong?.audio_url || activeSong?.songs[0]?.audio_url}
      src={audioUrl}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default MusicPlayer;
