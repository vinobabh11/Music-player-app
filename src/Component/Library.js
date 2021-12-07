import React from 'react'
import LibrarySongs from "./LibrarySongs";

const Library = ({songs, setCurrentSong}) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map(
                        (song) => (<LibrarySongs setCurrentSong={setCurrentSong} song={song} key={songs.id}/>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Library
