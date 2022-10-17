import { useEffect } from "react";
import About from "../../components/about/About";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navbar/Navbar";
import "./landing.css";
import axios from "axios";

export default function Landing() {
  return (
    <div>
      <div className="navBar">
        <Navbar />
      </div>
      <Hero />
      <About />
      <Footer />
    </div>
  );
}
