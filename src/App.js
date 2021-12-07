import React, { useState } from "react";
import Player from "./Component/Player";
import Song from "./Component/Song";
import "./Styles/app.scss";
import data from "./util";
import Library from "./Component/Library";

function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <Song currentSong = {currentSong} />
      <Player songs={songs} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong = {currentSong} />
      <Library setCurrentSong = {setCurrentSong} songs = {songs} />
    </div>
  );
}

export default App;
