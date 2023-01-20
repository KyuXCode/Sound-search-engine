import './style/result.scss'

import React, { useContext } from 'react';
import { PlaylistContext } from './App';

import NowPlayingBtn from './img/icon-playing.svg';
import QueuedBtn from './img/icon-playlist.svg';

function Result(props) {
    const playlistContext = useContext(PlaylistContext);

    const songStatus = () => {
        if (!(playlistContext.playlist.some(sound => sound.id === props.value.id))) {
            return null
        }
        if (props.value.id === playlistContext.playlist[0]?.id) {
            return NowPlayingBtn
        } else if (playlistContext.playlist.some(sound => sound.id === props.value.id)) {
            return QueuedBtn
        }
    }

    return (
        <div className='result sound' onClick={(e) => props.setSelected(props.value)}>
            <h2>{props.value.name}</h2>
            <p>{`By: ${props.value.username}`}</p>
            <img src={songStatus()} alt="" />
        </div>


    );
}

export default Result;