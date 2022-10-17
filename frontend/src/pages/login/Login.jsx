import axios from "axios";
import { useRef, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { loginCall } from "../../apiCalls";
import "./login.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const submitHandler = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };
  return (
    <div className="login">
      <Navbar getStarted={true} />
      <div className="loginWrapper">
        <div className="loginRight getStartedBox">
          <form className="getStarted-form" onSubmit={submitHandler}>
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
              Log Into Your Account
            </h2>
            <input
              placeholder="email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button
              className="btn-light loginButton"
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? "loading" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
