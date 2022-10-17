import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="nav-logo footer-header">
        you<span className="birr">Birr</span>
      </div>{" "}
      <div className="footer-details">
        <div className="footer-about">
          <p>Contact Us</p>
          <p>f</p>
          <p>t</p>
        </div>
        <div className="footer-copyright">
          <blockquote>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Accusantium quas quisquam non? Quas voluptate nulla minima deleniti
            optio ullam nesciuntsaepe provident nihil molestiae.
          </blockquote>
        </div>
      </div>
    </footer>
  );
}
