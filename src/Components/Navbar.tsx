import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import style from "./Navbar.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => path === router.pathname;

  return (
    <div className={style.main}>
      <h1>LOGO</h1>
      <div
        className={
          !isMenuOpen ? style.navbarContainer : style.navbarContainerClose
        }
      >
        <div className={style.search}>
          <input type="text" placeholder="search here.." />
          <Button
            variant="contained"
            style={{ backgroundColor: "purple" }}
            size="small"
          >
            Search
          </Button>
        </div>
        <nav className={style.navbar}>
          <ul className={!isMenuOpen ? style.navbar : style.navbarClose}>
            <li>
              <Link
                href="/"
                className={isActive("/") ? style.active : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={isActive("/about") ? style.active : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {/* -------contact Drop down--------------------- */}
            </li>
            <div className={style.dropdown}>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Link
                  href="/contact"
                  className={isActive("/abot") ? style.active : ""}
                >
                  Contact
                </Link>
                <RiArrowDropDownLine className={style.dropDownIcon} />
              </li>
              <div className={style.dropdownContent}>
                <ul>
                  <li>
                    <Link href="">Home</Link>
                  </li>
                  <li>
                    <Link href="">Home</Link>
                  </li>
                  <li>
                    <Link href="">Home</Link>
                  </li>
                </ul>
              </div>
            </div>

            <li>
              <Link
                href="/about"
                className={isActive("/abou") ? style.active : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={isActive("/bout") ? style.active : ""}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.ResponsiveMenubar}>
        {isMenuOpen ? (
          <RxCross1 onClick={() => setIsMenuOpen(false)} />
        ) : (
          <IoMenu
            className={style.ResponsiveMenubar}
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
