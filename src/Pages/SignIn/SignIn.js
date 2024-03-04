import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./SignIn.scss";
import TextInput from "../../components/Input/TextInput/TextInput";
import PasswordInput from "../../components/Input/PasswordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { setUser, setToken } from "../../app/authenticationSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logIn = async () => {
    let response = await fetch(
      "https://academics.newtonschool.co/api/v1/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectID: "f104bi07c490",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          appType: "music",
        }),
      }
    );

    const res = await response.json();

    if (res.status === "success" && res.token) {
      dispatch(setUser(res.data));
      dispatch(setToken(res.token));
      // toast.success(res.status, {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      console.log("Redirecting to home page");
      navigate("/");
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="logIn">
      <ToastContainer />
      <div className="logo">
        <Icon icon="logos:spotify" width={"150"} />
      </div>
      <div className="inputRegion">
        <div className="disc">To continue, log in to spotify.</div>
        <div className="inputSection">
          <TextInput
            label={"Email address "}
            placeholder={"Enter your Email address"}
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
                logIn();
              }}
            >
              LOG IN
            </button>
          </div>
          <div className="forgot">
            <Link to={"/update"}>Forgot your password?</Link>
          </div>
          <div className="line"></div>
          <div className="dont my-6 font-semibold text-lg">
            Dont't have an account?
          </div>
          <div className="div-btn">
            <Link to={"/signup"}>SIGN UP FOR SPOTIFY</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
