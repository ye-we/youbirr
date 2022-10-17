import React from "react";
import { Link } from "react-router-dom";
import Share from "../share/Share";
import "./rightbar.css";
export default function Rightbar({ creator }) {
  const Trending = [
    {
      name: "Julia Peterson",
      image: "/femaleAvatar",
      username: "@julia112",
    },
    {
      name: "Travis Johnson",
      image: "/maleAvatar",
      username: "@johnny12",
    },
    {
      name: "Angela Yung",
      image: "/femaleAvatar",
      username: "@a_n_g_e_l_a",
    },
  ];
  return (
    <div className="rightBar">
      <div className="rightBar-logo">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          you<span style={{ color: "gold" }}>Birr</span>
        </Link>
      </div>
      {!creator ? (
        <div className="rightBar-ad">
          <div className="sidebarActions">
            <h3 className="rightBar-ad-header">Trending Creators</h3>
            <ul className="actionsListRight" style={{ marginTop: "0" }}>
              {Trending.map((creator) => (
                <div className="trendingCreator" key={creator.username}>
                  <img
                    src={"/assets/" + creator.image + ".png"}
                    className="profileImg"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  ></img>
                  <p>{creator.name}</p>
                  <Link
                    className="actionLink"
                    to={"/"}
                    style={{
                      fontSize: "14px",
                      fontWeight: "300",
                      marginLeft: "30px",
                    }}
                  >
                    {creator.username}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <Share />
        </div>
      )}
    </div>
  );
}
