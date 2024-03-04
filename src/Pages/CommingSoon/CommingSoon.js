import React, { useEffect, useState } from "react";
import "./CommingSoon.scss";
import Navbar from "../../components/Navbar/Navbar";
import comming from "../../assets/images/coming-soon.gif";

const CommingSoon = () => {
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

        <div className="home-container1">
          <section className="section-1" key={0}>
            <div className="content1">
              <img src={comming} alt="" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommingSoon;
