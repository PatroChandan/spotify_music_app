import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "",
  searchSong: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      // state.activeSong =
      //   action.payload.data.songs[state.currentIndex] || action.payload.song;

      // if (action.payload?.data?.songs?.audio_url) {
      //   state.currentSongs = action.payload.data.songs.audio_url;
      // } else if (action.payload?.data?.songs) {
      //   state.currentSongs = action.payload?.data?.songs;
      // } else {
      //   state.currentSongs = action.payload.data;
      // }

      // state.currentIndex = action.payload.i;
      // state.isActive = true;

      if (
        action.payload.data &&
        Array.isArray(action.payload.data.songs) &&
        action.payload.data.songs.length > 0
      ) {
        // Set activeSong to the song at currentIndex in action.payload.data.songs
        state.activeSong = action.payload.data.songs[state.currentIndex];
        // Set currentSongs to the array of songs
        state.currentSongs = action.payload.data.songs;
        // Set currentIndex to the next index, cycling back to 0 if it exceeds the length of the songs array
        state.currentIndex =
          (state.currentIndex + 1) % action.payload.data.songs.length;
      } else {
        // Set activeSong to the provided song
        state.activeSong = action.payload.song;
        // Set currentSongs to an array containing only the provided song
        state.currentSongs = [action.payload.song];
        // Reset currentIndex to 0 if no songs array is provided
        state.currentIndex = action.payload.i;
      }

      state.isActive = true;
    },

    // nextSong: (state, action) => {
    //   if (state.currentSongs[action.payload.data.songs]?.audio_url) {
    //     state.activeSong =
    //       state.currentSongs[action.payload.data.songs]?.audio_url;
    //   } else {
    //     state.activeSong = state.currentSongs[action.payload];
    //   }

    //   state.currentIndex = action.payload;
    //   state.isActive = true;
    // },

    // prevSong: (state, action) => {
    //   if (state.currentSongs[action.payload]?.audio_url) {
    //     state.activeSong = state.currentSongs[action.payload]?.audio_url;
    //   } else {
    //     state.activeSong = state.currentSongs[action.payload];
    //   }

    //   state.currentIndex = action.payload;
    //   state.isActive = true;
    // },
    nextSong: (state) => {
      const nextIndex = (state.currentIndex + 1) % state.currentSongs.length;
      state.activeSong = state.currentSongs[nextIndex];
      state.currentIndex = nextIndex;
      state.isPlaying = true; // Assuming you want to start playing the next song automatically
    },

    prevSong: (state) => {
      const prevIndex =
        (state.currentIndex - 1 + state.currentSongs.length) %
        state.currentSongs.length;
      state.activeSong = state.currentSongs[prevIndex];
      state.currentIndex = prevIndex;
      state.isPlaying = true; // Assuming you want to start playing the previous song automatically
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
    setSearchSong: (state, action) => {
      state.searchSong = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
  setSearchSong,
} = playerSlice.actions;

export default playerSlice.reducer;
