import React from "react";
import ReactDOM from "react-dom";

import Poker from "./components/poker/index";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Poker />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
