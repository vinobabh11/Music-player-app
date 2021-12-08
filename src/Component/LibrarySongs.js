import React from 'react'
import { playAudio } from "../util";

const LibrarySongs = ({songs, song, setCurrentSong, audioRef, isPlaying, setSongs }) => {
    
    const songSelectHandler = () => {
        setCurrentSong(song);
        // const newSong = (song.active) ? false : true; 
        const id = song.id;

        const newSong = songs.map((song) => {
            const key= song.id;
            if (key !== id) {
                return{
                    ...song,
                    active: false
                }
            }else{
                return{
                    ...song,
                    active: true
                }
            }
        })
        setSongs(newSong);

        playAudio(isPlaying,audioRef);
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-dis">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySongs
