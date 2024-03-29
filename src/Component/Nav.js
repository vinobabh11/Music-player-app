import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({librarySatus, setLibrarySatus}) => {
    return (
        <nav>
            <h1>Mousam music</h1>
            <button onClick={() => setLibrarySatus(!librarySatus)}>
                Library
                <FontAwesomeIcon icon = {faMusic} />
            </button>
        </nav>
    )
}

export default Nav
