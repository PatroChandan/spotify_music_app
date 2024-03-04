import React from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import Track from "./components/Track/Track";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AlbumList from "./components/AlbumList/AlbumList";
import SeeAll from "./components/SeeAll/SeeAll";
import SearchBar from "./Pages/SearchBar/SearchBar";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./Pages/UserProfile/UserProfile";
import CommingSoon from "./Pages/CommingSoon/CommingSoon";
import Favourite from "./Pages/Favourite/Favourite";

function App() {
  const Feed = () => {
    return (
      <div className="app">
        <div className="main">
          <Sidebar />
          <Outlet />
        </div>
        <Track />
      </div>
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Feed />}>
            <Route path="/" element={<Home />} />
            <Route path="/AlbumList" element={<AlbumList />} />
            <Route path="/SeeAll" element={<SeeAll />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/comming" element={<CommingSoon />} />
            <Route path="/favourite" element={<Favourite />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
