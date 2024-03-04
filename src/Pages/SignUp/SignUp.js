import React, { useState } from "react";
import TextInput from "../../components/Input/TextInput/TextInput";
import { Icon } from "@iconify/react";
import PasswordInput from "../../components/Input/PasswordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { setUser, setToken } from "../../app/authenticationSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SignUp = async () => {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectID: "f104bi07c490",
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
          appType: "music",
        }),
      }
    );
    const res = await response.json();
    console.log("register", response);
    if (res.status === "success") {
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.token));

      // toast.success(res.status, {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      navigate("/");
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="signup">
      <ToastContainer />

      <div className="logo">
        <Icon icon="logos:spotify" width={"150"} />
      </div>
      <div className="inputRegion">
        <div className="disc">To continue, log in to spotify.</div>
        <div className="inputSection">
          <TextInput
            label={"User Name"}
            placeholder={"Enter your User name"}
            value={userName}
            setValue={setUserName}
          />
          <TextInput
            label={"Email address "}
            placeholder={"Enter your Email address "}
            value={email}
            setValue={setEmail}
          />
          <PasswordInput
            label={"Password"}
            placeholder={"Enter your Password"}
            value={password}
            setValue={setPassword}
          />
          <div className="box1">
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                SignUp();
              }}
            >
              SIGN UP
            </button>
          </div>
          {/* <div className="forgot">
            <Link to={"/update"}>Forgot your password?</Link>
          </div> */}
          <div className="line"></div>
          <div className="dont my-6 font-semibold text-lg">
            Already have an account?
          </div>
          <div className="div-btn">
            <Link to={"/signin"}>SIGN IN FOR SPOTIFY</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
