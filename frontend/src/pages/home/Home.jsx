import React, { useContext } from "react";
import "./home.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="homeContainer">
      <Sidebar creator={user.isCreator} />
      <Feed />
      <Rightbar creator={user.isCreator} />
    </div>
  );
}
