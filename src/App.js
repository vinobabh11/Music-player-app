import React from "react";
import Player from "./Component/Player";
import Song from "./Component/Song";
import "./Styles/app.scss";

function App() {
  return (
    <div>
      <Song />
      <Player />
    </div>
  );
}

export default App;
