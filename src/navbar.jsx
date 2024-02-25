import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/Logo.svg"
import home1 from "../assets/home1.svg"
import home2 from "../assets/home2.svg" 
import dash1 from "../assets/Dash1.svg"
import dash2 from "../assets/Dash2.svg" 
import frame1 from "../assets/Frame1.svg"
import frame2 from "../assets/Frame2.svg"
import frame3 from "../assets/Frame3.svg"
import frame4 from "../assets/Frame4.svg"
import sidebar from "../assets/Sidebar.svg"


function Nav({page, setPage}) { 
  useEffect(() => {
    if (page === "home") {
      document.querySelector(".home-btn img").src = home1;
      document.querySelector(".dash-btn img").src = dash1;
    } else {
      document.querySelector(".home-btn img").src = home2;
      document.querySelector(".dash-btn img").src = dash2;
    }
  }, [page]);
  return (
         <>
         <div className="Nav">
            <header>
                <nav>
                    <div className="navbar">
                        <a href="#"><img src={logo} alt="" /></a>
                        <ul>
                            <li><button className="home-btn" onClick={() => setPage("home")}><img src={home1} alt="" /></button></li> 
                            <li><button><img src={frame1} alt="" /></button></li>
                            <li><button className="dash-btn" onClick={() => setPage("dash")}><img src={dash1} alt="" /></button></li> 
                            <li><button><img src={frame2} alt="" /></button></li>
                            <li><button><img src={frame3} alt="" /></button></li>
                            <li><button><img src={frame4} alt="" /></button></li>
                            <li><button><img src={sidebar} alt="" /></button></li>

                        </ul>
                    </div>
                </nav>
            </header>
         </div>
         </>
  );
}

export default Nav;