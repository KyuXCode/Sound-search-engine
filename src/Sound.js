import React, { useContext } from 'react';
import { PlaylistContext } from './App';
import './style/sound.scss';


function Sound(props) {
    const playlistContext = useContext(PlaylistContext)

    const songStatus = () => {
        if (props.value.id === playlistContext.playlist[0]?.id) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className='sound'>
            <h1>{songStatus() ? <span>NOW PLAYING</span> : <br></br>}</h1>
            <h1>{props.value.name}</h1>
            <h2>{`By ${props.value.username}`}</h2>
            <p dangerouslySetInnerHTML={{ __html: props.value.description }}></p>
            <h4>{`Tags: ${props.value.tags}`}</h4>

            <div className="box">
                <button onClick={(e) => playlistContext.play(props.value)}>PLAY</button>
                <button onClick={(e) => playlistContext.queue(props.value)}>ADD TO PLAYLIST</button>

                <button>DOWNLOAD
                    <p>{`File size: ${(props.value.filesize / 1000000).toFixed(2)}MB, MP3`}</p>
                </button>
            </div>

            <h3>Create On:</h3>
            <p>{props.value.created}</p>

            <h3>Download Count:</h3>
            <p>{props.value['num_downloads']}</p>

            <h3>Average Rating:</h3>
            <p>{'⭐️'.repeat(Math.round(props.value['avg_rating']))}</p>
            <h3>Waveform:</h3>
            <img src={props.value['images']['waveform_bw_m']} alt="" />
        </div>
    );
}
export default Sound;