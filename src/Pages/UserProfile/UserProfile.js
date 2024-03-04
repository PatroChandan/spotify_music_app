import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import Navbar from "../../components/Navbar/Navbar";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { name, email } = useSelector((state) => state.auth.user);
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

  return (
    <div className="home">
      <div className="home-inside">
        <Navbar home={true} />

        <div className="home-container">
          <section className="section-1" key={0}>
            <div className="heading">{/* <h1>Good evening</h1> */}</div>
            <div className="content1">
              {/* <div className="left"> */}
              <Avatar name={name} round />
              {/* </div> */}
              <div className="right">
                <h2>{name}</h2>
                <h5>{email}</h5>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
