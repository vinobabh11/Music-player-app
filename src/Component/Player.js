import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleRight, faAngleLeft, faPause } from "@fortawesome/free-solid-svg-icons";
// import { playAudio } from "../util";


const Player = ({
    audioRef,
    songInfo,
    setSongInfo,
    setIsPlaying,
    isPlaying,
    songs,
    setCurrentSong,
    currentSong,
    setSongs }) => {

    const playSongHandler = () => {

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);

        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const getTime = (Time) => {
        return (
            Math.floor(Time / 60) + ":" + ("0" + Math.floor(Time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                activeLibraryHandler(songs[songs.length - 1]);
                await setCurrentSong(songs[songs.length - 1]);
                if(isPlaying) audioRef.current.play();
                return;
            }
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        if(isPlaying) audioRef.current.play();
    }

    const activeLibraryHandler = (nextprev) => {
        const newSong = songs.map((song) => {
            const key = song.id;
            if (key !== currentSong.id) {
                return {
                    ...song,
                    active: false
                }
            } else {
                return {
                    ...song,
                    active: true
                }
            }
        })
        setSongs(newSong);
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        type="range"
                        onChange={dragHandler} />
                        <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-back')}
                    className="perivious-song"
                    size='2x'
                    icon={faAngleLeft} />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    size='2x'
                    className="play"
                    icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-forward')}
                    className="next-song"
                    size='2x'
                    icon={faAngleRight} />
            </div>
        </div>
    )
}

export default Player
