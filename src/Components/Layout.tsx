import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}

export default Layout;
