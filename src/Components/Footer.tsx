import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
          backgroundColor: "#f0e4d3",
          borderBottom: "1px solid #ccc",
        }}
      >
        <p style={{ fontSize: "18px", color: "purple", fontWeight: "bold" }}>
          SheShine
        </p>
        <p>Everyday Glam, Just a Click Away</p>
      </div>
      <div className="footer">
        <div>
          <h4>Contact Us</h4>
          <a
            href="mailto:parmartulsi222@gmail.com"
            style={{ color: "black", fontSize: "15px" }}
          >
            parmartulsi222@gmail.com
          </a>
          <p>9718291234</p>
        </div>
        <div>
          <h4>Address</h4>
          <p>
            Prahlad Nagar,satellite <br />
            Ahmedabad Gujrat India
          </p>
        </div>
        <div>
          <h4>Pages</h4>
          <div className="footerLinks">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/products">Products</a>
          </div>
        </div>

        <div>
          <p>copyright @2025 SheShine</p>
          <div className="FooterIcons">
            <FaInstagram />
            <FaFacebook />
            <FaTwitter />
            <FaTelegram />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
