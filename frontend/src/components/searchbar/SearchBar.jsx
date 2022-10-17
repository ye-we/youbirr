import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import "./searchbar.css";
export default function SearchBar() {
  return (
    <div className="search">
      <form className="searchBarForm">
        <input className="searchBar" placeholder="Search Creators..." />
        <IconButton type="submit" sx={{ ml: -7, p: "10px", color: "black" }}>
          <Search />
        </IconButton>
      </form>
    </div>
  );
}
