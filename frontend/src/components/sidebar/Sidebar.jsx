import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SettingsIcon from "@mui/icons-material/Settings";
import "./sidebar.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Sidebar({ creator }) {
  const { user } = useContext(AuthContext);

  console.log("sidebar", creator);
  return (
    <div className="sidebar">
      <div className="sidebarProfile">
        <div className="profilePicture">
          <img src="/assets/maleAvatar.png" className="profileImg"></img>
        </div>
        <div className="profileName">{user.username}</div>
        <div className="profileDesc">{user.email}</div>
      </div>
      <div className="sidebarActions">
        <ul className="actionsList">
          <Link className="actionLink active" to={"/"}>
            Feed
          </Link>
          <Link className="actionLink " to={"/settings"}>
            Settings
          </Link>
          {!creator ? (
            <Link className="actionLink " to={"/followings"}>
              Followings
            </Link>
          ) : (
            ""
          )}
          {creator ? (
            <Link className="actionLink " to={"/package"}>
              Package
            </Link>
          ) : (
            ""
          )}
          <Link className="actionLink " to={"/balance"}>
            Balance
          </Link>
        </ul>
      </div>
      <div className="sidebarFooter">
        <Link className="btn-yellow sidebarFooter-link" to={"/"}>
          Logout
        </Link>
      </div>
    </div>
  );
}
