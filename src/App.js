import React, { createContext } from "react";
import './style/style.scss';
import { useEffect, useState } from 'react';



import Sound from './Sound.js';
import Result from './Result.js';
import NowPlaying from "./NowPlaying.js";

export const PlaylistContext = createContext();

function App() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [detail, setDetail] = useState('');

  const token = 'eTn9vAatgMdzT4sB0qHhkOAU0lM8cw4eZgVo5cyx'

  function Queue(id, name, url) {
    return {
      id: id,
      name: name,
      url: url
    }
  }

  let playlistContext = {
    playlist: playlist,
    
    next: () => {
      if (playlist.length > 1) {
        const playlistCopy  = playlist.slice()
        playlistCopy.shift()
        setPlaylist(playlistCopy);
      }
    },

    play: (sound, fromPlaylist = false) => {
      console.log(fromPlaylist);
      const soundPlay = Queue(sound.id, sound.name, fromPlaylist? sound.url : sound['previews']['preview-lq-mp3']);
      setPlaylist((original) => {
        original.shift();
        return [(soundPlay), ...original]
      })
    },

    queue: (sound) => {
      const soundQueue = Queue(sound.id, sound.name, sound['previews']['preview-lq-mp3']);
      setPlaylist((original) => {
        return [...original, (soundQueue)]
      })
    },

  }



  useEffect(() => {
    if (selected) {
      displayDetail(selected.id);
    }
  }, [selected]);

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch()
  }

  function handleSearch() {
    let searchInput = document.querySelector('.input').value;
    fetch(`https://freesound.org/apiv2/search/text/?format=json&query=${searchInput}&token=${token}`)
      .then(response => response.json())
      .then(data => setResults(data.results))
  }

  function displayDetail(soundId) {
    let url = `https://freesound.org/apiv2/sounds/${soundId}/?token=${token}`;
    fetch(url).then(response => response.json()).then(sound => setDetail(sound));
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <PlaylistContext.Provider value={playlistContext}>

        <div className="user-bar">
          <div className="search">
            <h1 className="app-title">Sound Search</h1>
            <div className="input-field">
              <input className='input' type="search" placeholder='Search by name' />
              <button type='submit' >SEARCH</button>
            </div>
          </div>

          <div className='search-result result'>
            {results.length > 0 ? results.map((result) => <Result key={result.id} value={result} setSelected={setSelected} />) : <p className="action">Search a song</p>}
          </div>
        </div>

        <div className="sound-detail">
          <div className="detail">
            {detail ? <Sound value={detail}></Sound> : <p className="action">Select a song to see results</p>}
          </div>
        </div>

        <NowPlaying value={detail} setSelected={setSelected}></NowPlaying>

      </PlaylistContext.Provider>
    </form>
  );
}
export default App;

