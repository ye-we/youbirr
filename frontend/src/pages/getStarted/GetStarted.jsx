import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import "./getStarted.css";

export default function GetStarted() {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const tabClickHandler = function (e) {
    const clickedTab = e.target;
    const clickedSiblings = clickedTab.parentElement.childNodes;
    const getStartedContent = document.querySelectorAll(".getStarted-content");
    clickedSiblings.forEach((s) => {
      s.classList.remove("getStarted-tab--active");
    });
    clickedTab.classList.add("getStarted-tab--active");
    getStartedContent.forEach((c) =>
      c.classList.remove("getStarted-content--active")
    );
    document
      .querySelector(`.getStarted-content--${clickedTab.dataset.tab}`)
      .classList.add("getStarted-content--active");
  };
  const userEmail = useRef();
  const userPassword = useRef();
  const userPasswordRepeat = useRef();
  const userName = useRef();

  const creatorEmail = useRef();
  const creatorPassword = useRef();
  const creatorPasswordRepeat = useRef();
  const creatorName = useRef();

  const imageUrl = useRef();
  const userSubmitHandler = async (e) => {
    e.preventDefault();
    if (userPassword.current.value !== userPasswordRepeat.current.value) {
      console.log("Passwords don't match");
    } else {
      const user = {
        username: userName.current.value,
        email: userEmail.current.value,
        password: userPassword.current.value,
      };
      try {
        const res = await axios.post("/auth/registerUser", user);
        loginCall(
          {
            email: userEmail.current.value,
            password: userPassword.current.value,
          },
          dispatch
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const creatorSubmitHandler = async (e) => {
    e.preventDefault();
    if (creatorPassword.current.value !== creatorPasswordRepeat.current.value) {
      console.log("Passwords don't match");
    } else {
      const creator = {
        username: creatorName.current.value,
        email: creatorEmail.current.value,
        password: creatorPassword.current.value,
      };
      try {
        const res = await axios.post("/auth/registerCreator", creator);
        loginCall(
          {
            email: creatorEmail.current.value,
            password: creatorPassword.current.value,
          },
          dispatch
        );
        // user = res.data;
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="getStarted">
      <Navbar landing={"Login"} />
      <div className="getStartedBox">
        <div className="getStarted-tab--container">
          <button
            className="getStarted-tab getStarted-tab--1 getStarted-tab--active"
            data-tab="1"
            onClick={tabClickHandler}
          >
            Become A Supporter
          </button>
          <button
            className="getStarted-tab getStarted-tab--2"
            data-tab="2"
            onClick={tabClickHandler}
          >
            Become A Creator
          </button>
        </div>
        <div className="getStarted-content getStarted-content--1 getStarted-content--active">
          <form className="getStarted-form" onSubmit={userSubmitHandler}>
            <input
              placeholder="username"
              type="text"
              required
              className="loginInput"
              ref={userName}
            />
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={userEmail}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={userPassword}
            />
            <input
              placeholder="Repeat Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={userPasswordRepeat}
            />
            <button className="btn-light becomeSupporter-btn">
              {isFetching ? "loading..." : "Become A Supporter"}
            </button>
          </form>
        </div>

        <div className="getStarted-content getStarted-content--2">
          <form className="getStarted-form" onSubmit={creatorSubmitHandler}>
            <input
              placeholder="creator name"
              type="text"
              required
              className="loginInput"
              ref={creatorName}
            />
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={creatorEmail}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={creatorPassword}
            />

            <input
              placeholder="Repeat Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={creatorPasswordRepeat}
            />
            {/* <div className="chooseFile">
              <label htmlFor="id" className="fileLabel">
                Id
              </label>
              <input
                id="id"
                placeholder="Id Card"
                type="file"
                style={{ display: "none" }}
              />
            </div> */}
            <button className="btn-light becomeSupporter-btn">
              {isFetching ? "loading..." : "Become A Creator"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
