import React from "react";
import Post from "../post/Post";
import SearchBar from "../searchbar/SearchBar";
import "./feed.css";

export default function Feed() {
  console.log("feed");
  return (
    <div className="feed">
      <SearchBar />
      <Post />
    </div>
  );
}
