import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import style from "./Navbar.module.css";
import { Button, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import { BsCart2 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { FcLikePlaceholder } from "react-icons/fc";
import { VscAccount } from "react-icons/vsc";
import { Badge } from "@mui/material";
import { cartSliceActions } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSession } from "next-auth/react";
import { UseDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { Menu } from "@mui/material";
import axios from "axios";
import { addItemToGuestCart, getGuestCard } from "../../utils/cartStorage";

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { cart } = useSelector((state: RootState) => state.Cart);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const isActive = (path: string) =>
    path === router.asPath || router.asPath.startsWith(path + "/");
  const isCategory = () =>
    router.pathname == "/categories" ||
    router.pathname.startsWith("/categories");
  const handleSearchNavigation = () => {
    console.log("search query", searchQuery);
    if (searchQuery == "") {
      console.log("yes search query is empty");
      router.push("/shop");
    } else {
      router.push(`/search/?q=${searchQuery}`);
    }
  };

  useEffect(() => {
    setSearchQuery(router.query.q);
  }, [router.query.q]);

  // ------------------------------profile(options)-------------------------------------
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    signOut();
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      if (session?.user.id) {
        console.log("authorizsed");
        try {
          console.log("data fetched", session?.user?.id);
          const { data } = await axios.post("/api/cart/cartitems", {
            userId: session?.user?.id,
          });
          console.log("data from navbar component", data.total);
          dispatch(cartSliceActions.addToCart(data.total));
        } catch (error) {
          console.log(
            "error from navbar component while fetching cart items count",
            error
          );
        }
      } else {
        const getGuestcard = getGuestCard();
        const totalItems = getGuestcard.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        dispatch(cartSliceActions.addToCart(totalItems));
      }
    };
    fetchCartCount();
  }, [session, cart]);

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
            onKeyDown={(e) => e.key === "Enter" && handleSearchNavigation()}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "purple" }}
            size="small"
            onClick={() => handleSearchNavigation} //this is query string.. encoded so
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
              {/* --------------------Contact Drop down--------------------- */}
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
          <Badge badgeContent={cart} color="primary">
            <Tooltip title="Add to cart">
              <BsCart2 onClick={() => router.push("/addtocart")} />
              {/* <BsCart2 onClick={() => } /> */}
            </Tooltip>
          </Badge>
          <Tooltip title="wishlist">
            <FcLikePlaceholder onClick={() => router.push("/wishlist")} />
          </Tooltip>
          <Tooltip title="profile">
            {/* <VscAccount onClick={() => router.push("/profile")} /> */}
            <VscAccount
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          </Tooltip>
          {/* --------------------------------Profile------------------------------------ */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
            {status === "unauthenticated" ? (
              <MenuItem onClick={() => router.push("/login")}>Login</MenuItem>
            ) : (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            )}
          </Menu>
          {/* <button onClick={() => router.push("/register")}>Register</button> */}
          {/* <button onClick={() => router.push("/login")}>Login</button> */}
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
