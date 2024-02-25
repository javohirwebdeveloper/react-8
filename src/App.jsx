import React, { useState, useRef, useEffect } from "react";
import Nav from "./navbar";
import Home from "./components/home";
import Dash from "./components/dashboard";
import "./App.css"
function App() {
  const [page, setPage] = useState("home"); 
  return (
         <>
         <div className="App">
                   <Nav page={page} setPage={setPage}/> 
         </div>
         {page === "home" ? <Home /> : <Dash />} 
         </>
  );
}

export default App;