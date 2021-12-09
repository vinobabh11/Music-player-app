import React, { useState, useRef } from "react";
import Player from "./Component/Player";
import Song from "./Component/Song";
import "./Styles/app.scss";
import data from "./data";
import Library from "./Component/Library";
import Nav from "./Component/Nav";

function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  })
  const [librarySatus, setLibrarySatus] = useState(false);

  const TimeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    const roundCurrent = Math.round(currentTime);
    const roundDuration = Math.round(duration);
    const animation = Math.round((roundCurrent / roundDuration) * 100)

    console.log(animation);
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage: animation });
  }

  const songEndHander = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if(isPlaying) audioRef.current.play();
  };

  const audioRef = useRef(null);

  return (
    <div className={`App ${librarySatus ? 'library-active' : ''}`}>
      <Nav
        librarySatus={librarySatus}
        setLibrarySatus={setLibrarySatus} />

      <Song currentSong={currentSong} />

      <Player
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        songs={songs}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
      />

      <Library
        librarySatus={librarySatus}
        setSongs={setSongs}
        isPlaying={isPlaying}
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        songs={songs} />

      <audio
        onLoadedMetadata={TimeUpdateHandler}
        onTimeUpdate={TimeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHander}>
      </audio>
    </div>
  );
}

export default App;
