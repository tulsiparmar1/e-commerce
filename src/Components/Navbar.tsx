import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import style from "./Navbar.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import { BsCart2 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { FcLikePlaceholder } from "react-icons/fc";
import { VscAccount } from "react-icons/vsc";

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const encodedQuery = encodeURIComponent(searchQuery); //encode as query parameter in url (replace space with %20)
  const isActive = (path: string) =>
    path === router.asPath || router.asPath.startsWith(path + "/");
  const isCategory = () =>
    router.pathname == "/categories" ||
    router.pathname.startsWith("/categories");

  return (
    <div className={style.main}>
      <h1 style={{ color: "purple" }}>SheShine</h1>
      <div
        className={
          !isMenuOpen ? style.navbarContainer : style.navbarContainerClose
        }
        style={{ zIndex: "389" }}
      >
        <div className={style.search}>
          <input
            type="text"
            placeholder="search here.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "purple" }}
            size="small"
            onClick={() => router.push(`/search/?q=${encodedQuery}`)} //this is query string.. encoded so
            // that spaces and special character works
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
                href="/shop"
                className={isActive("/shop") ? style.active : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              {/* -------Contact Drop down--------------------- */}
            </li>
            <div className={style.dropdown} style={{ zIndex: "399" }}>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Link href=" " className={isCategory() ? style.active : ""}>
                  Categories
                </Link>
                <RiArrowDropDownLine className={style.dropDownIcon} />
              </li>
              <div className={style.dropdownContent}>
                <ul>
                  <li>
                    <Link
                      href="/categories/dress/maxies"
                      className={
                        isActive("/categories/dress") ? style.active : ""
                      }
                    >
                      Dress
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories/kurties"
                      className={
                        isActive("/categories/kurties") ? style.active : ""
                      }
                    >
                      Kurties
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories/formal"
                      className={
                        isActive("/categories/formal") ? style.active : ""
                      }
                    >
                      Formal
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <li>
              <Link
                href="/sale"
                className={isActive("/sale") ? style.active : ""}
              >
                Sale
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={isActive("/about") ? style.active : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={isActive("/contact") ? style.active : ""}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className={style.navbarIcons}>
          <Tooltip title="wishlist">
            <BsCart2 onClick={() => router.push("/wishlist")} />
          </Tooltip>
          <Tooltip title="Add to cart">
            <FcLikePlaceholder onClick={() => router.push("/addtocart")} />
          </Tooltip>
          <Tooltip title="profile">
            <VscAccount onClick={() => router.push("/profile")} />
          </Tooltip>
        </div>
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
