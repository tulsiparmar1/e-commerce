import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
function Layout({ children }: { children: React.ReactNode }) {
  const hideLayoutPaths = ["/login", "/register"];
  const router = useRouter();
  const shouldHideLayout = hideLayoutPaths.includes(router.pathname);
  return (
    <div>
      {!shouldHideLayout && <Navbar></Navbar>}

      {children}
      {!shouldHideLayout && <Footer></Footer>}
    </div>
  );
}

export default Layout;
