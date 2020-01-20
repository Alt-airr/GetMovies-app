import React from 'react';
import './css/MovieGenre.css'

const Genre = (props) => {
    return (
        <div className='genres'>
           <p className='genre'>{props.genre}</p>
        </div>
    )
}

export default Genre;