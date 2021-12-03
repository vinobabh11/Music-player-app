import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const Player = () => {
    return (
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" />
                <p>Stop Time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="perivious-song" icon={faAngleLeft} />
                <FontAwesomeIcon className="play" icon={faPlay} />
                <FontAwesomeIcon className="next-song" icon={faAngleRight} />
            </div>
        </div>
    )
}

export default Player
