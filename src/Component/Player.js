import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleRight, faAngleLeft, faPause } from "@fortawesome/free-solid-svg-icons";


const Player = ({ songs, currentSong, setIsPlaying, isPlaying }) => {
    const audioRef = useRef(null);
    const playSongHandler = () => {

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
            
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

    const getTime = (Time) => {
        return (
            Math.floor(Time / 60) + ":" + ("0" + Math.floor(Time % 60)).slice(-2)
        )
    }

    const TimeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime, duration });
    }

    const dragHandler = (e) =>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                min={0}
                max={songInfo.duration}
                value={songInfo.currentTime}
                type="range"
                onChange={dragHandler} />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="perivious-song" size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} size='2x' className="play" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon className="next-song" size='2x' icon={faAngleRight} />
            </div>
            <audio
                onLoadedMetadata={TimeUpdateHandler}
                onTimeUpdate={TimeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}>
            </audio>
        </div>
    )
}

export default Player
