import React, { useState } from "react";
import "./Navbar.scss";
import { user } from "../../database/data";
import Modal from "@mui/material/Modal";
import PlaylistsModal from "../PlaylistsModal/PlaylistsModal";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/backendUrl";
import { useDispatch, useSelector } from "react-redux";
import { setSearchSong } from "../../app/playerSlice";
import { logout } from "../../app/authenticationSlice";
import Avatar from "react-avatar";
import nasa from "../../assets/images/nasa.jpg";

function Navbar({ home }) {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user.name);

  const handleSearchSong = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/song?search={"title":"${searchText}"}`,
        {
          headers: {
            projectId: "f104bi07c490",
          },
        }
      );

      // if (!response.ok) {
      //   throw new Error("Failed to fetch search results");
      // }

      const searchData = await response.json();
      console.log(searchData, "search data");
      if (searchData.status === "success") {
        // navigate("/Search", {
        //   state: { searchSongText: searchText, searchData: searchData },
        // });
        const searchSongData = searchData.data;
        dispatch(setSearchSong(searchData.data));
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error, maybe show a message to the user
    }
  };
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="nav-btns back" onClick={() => navigate(-1)}>
          <ion-icon name="chevron-back-circle"></ion-icon>
        </button>
        <button className="nav-btns forward" onClick={() => navigate(1)}>
          <ion-icon name="chevron-forward-circle"></ion-icon>
        </button>
        {/* {!home && (
          <button className="play-btn">
            <ion-icon name="play-circle"></ion-icon>
          </button>
        )}
        {!home && <h2>Liked Songs</h2>} */}
        {!home && (
          <div className="searchBar">
            <ion-icon name="search"></ion-icon>
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSong();
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="navbar-right">
        <div className="playlists">
          <button className="playlist-btn" onClick={() => setOpenModal(true)}>
            <ion-icon name="list"></ion-icon>
          </button>

          <Modal
            className="playlist-modal-container"
            open={openModal}
            onClose={() => setOpenModal(false)}
          >
            <PlaylistsModal />
          </Modal>
        </div>
        <Link to={"/comming"} style={{ textDecoration: "none" }}>
          <button className="upgrade-btn">
            <h4>Upgrade</h4>
          </button>
        </Link>

        <div className="menu">
          <button
            onClick={() => {
              document.querySelector(".menu").classList.toggle("active");
            }}
            className="menu-btn"
          >
            {/* <img src={nasa} alt="" /> */}
            <Avatar name={userName} round size="25" />
            <h4>{userName}</h4>
            <ion-icon name="caret-down"></ion-icon>
          </button>

          <ul className="menu-list">
            <li>
              Account
              <ion-icon name="open-outline"></ion-icon>
            </li>
            <li>
              {" "}
              <Link to={"/userProfile"} style={{ textDecoration: "none" }}>
                Profile
              </Link>{" "}
            </li>
            <li>
              <Link
                to={"https://www.spotify.com/in-en/premium/"}
                style={{ textDecoration: "none" }}
              >
                Upgrade to Premium
                <ion-icon name="open-outline"></ion-icon>
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/comming"} style={{ textDecoration: "none" }}>
                Settings
              </Link>
            </li>
            <li className="logout" onClick={logOut}>
              Log out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
