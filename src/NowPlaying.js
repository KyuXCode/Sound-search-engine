import './style/nowPlaying.scss';
import React, { useContext } from 'react';
import { PlaylistContext } from './App';

function NowPlaying(props) {
    const playlistContext = useContext(PlaylistContext);

    if (playlistContext.playlist.length === 0) {
        return null
    }

    const playlistQueued = playlistContext.playlist.slice();
    playlistQueued.shift();

    return (
        <div className='now-playing-tab'>
            <h2 className='title'>NOW PLAYING</h2>
            <hr />

            <h1 className='song-title'>{playlistContext.playlist[0]?.name}</h1>
            <audio controls={true} autoPlay={true} onEnded={playlistContext.next} src={playlistContext.playlist[0].url}></audio>

            <p>
                <button onClick={(e) => props.setSelected(playlistContext.playlist[0])}>
                    View Details
                </button>
            </p>

            <h2 className='title'>UP NEXT</h2>
            <hr />
            <div className="queue">
                {playlistQueued.map((sound, index) => {
                    if (playlistContext.playlist.length === 0) {
                        return null
                    }
                    return <h2 className='song-queued' key={sound.id} onClick={(e) => playlistContext.play(sound, true)}>{sound.name}</h2>
                })}
            </div>
        </div>
    );
}

export default NowPlaying;