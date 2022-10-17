import React, { useContext, useEffect } from "react";
import { MoreVert } from "@mui/icons-material";
import "./post.css";
import { useState } from "react";
import axios from "axios";
// import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post() {
  const { user } = useContext(AuthContext);
  console.log("post");
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(user._id);
        const res = user.isCreator
          ? await axios.get(`/creators/${user._id}`)
          : await axios.get(`/users/${user._id}`);

        const currentPosts = await axios.get(
          `/post/timeline/${res.data.data._id}`
        );
        setPost(currentPosts.data.data.timeline);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);
  console.log(post);

  // const post = !user.isCreator
  //   ? [
  //       {
  //         profile: "femaleAvatar",
  //         creatorName: "Jane Carter",
  //         desc: "staying safe",
  //         img: "postFemale",
  //       },

  //       {
  //         profile: "maleAvatar",
  //         creatorName: "John Carter",
  //         desc: "way back...",
  //         img: "postMale",
  //       },
  //     ]
  //   : [
  //       {
  //         profile: "maleAvatar",
  //         creatorName: "John Carter",
  //         desc: "way back...",
  //         img: "postMale",
  //       },
  //     ];
  // const user = Users.filter(u=>u.id===post.userId);
  // const [user, setUser] = useState({});
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await axios.get(`/users?userId=${post.userId}`);
  //     setUser(res.data);
  //   };
  //   fetchUsers();
  // }, [post.userId]);
  //   const PF  = process.env.REACT_APP_PUBLIC_FOLDER;
  //   console.log(PF);
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      {post.map((p) => (
        <div className="postWrapper" key={p._id}>
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/`}>
                <img
                  src={"/assets/" + p.profile + ".png"}
                  alt=""
                  className="postProfileImg"
                />
              </Link>
              <span className="postUsername">{p.creatorId}</span>
              <span className="postDate">{new Date().toISOString}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{p.desc} </span>
            <img src={"/assets/" + p.img + ".jpg"} alt="" className="postImg" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                src="assets/yellow.png"
                alt=""
                className="likeIcon"
                onClick={likeHandler}
              />
              <img
                src="assets/yellow.png"
                alt=""
                className="likeIcon"
                onClick={likeHandler}
              />
              <span className="postLikeCounter">
                {like} people liked so far
              </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">0 comments</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
