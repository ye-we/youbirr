import React from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <input
            type="text"
            className="shareInput"
            placeholder="Paste video link"
          />
          <hr className="shareHr" />

          <textarea name="caption" className="shareCaption" cols="50" rows="5">
            Caption
          </textarea>
        </div>
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="white" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
