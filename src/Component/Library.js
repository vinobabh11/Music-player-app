import React from 'react'
import LibrarySongs from "./LibrarySongs";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs,librarySatus }) => {
    return (
        <div className={`library ${librarySatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map(
                        (song) => (<LibrarySongs 
                            key={song.id}
                            songs={songs}
                            setSongs={setSongs}
                            isPlaying={isPlaying} 
                            audioRef={audioRef} 
                            setCurrentSong={setCurrentSong} 
                            song={song}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Library
