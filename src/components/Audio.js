import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import song from "./../theme.mp3"
import { FiVolume2 } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

function AudioPlayer() {
  const [volume, setVolume] = useState(0.2);
  const [soundOn, setSoundOn] = useState(true);
  const [audioAutoPlay, setAudioAutoPlay] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  useEffect(() => {

    setAudioAutoPlay(true);
  }, []);

  const handleVolumenChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };



    const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
    };


  return (
    <div className='flex flex-col bg-gray-800 text-white justify-center p-2 rounded-md z-10'>
      <ReactAudioPlayer
        src={song}
        autoPlay={audioAutoPlay} // Configura el autoPlay según el estado
        volume={volume}
      />

        
      <button onClick={toggleVolumeControl}>
          {volume > 0 ? (
            <FontAwesomeIcon icon={faVolumeUp} size="1x" />
          ) :(
            <FontAwesomeIcon icon={faVolumeMute} size="1x" />
          )}
        </button>

        {showVolumeControl && (
         <div className="volume-control">
            <input
              type="range"
              min="0"
             max="0.7"
            step="0.01"
            value={volume}
            onChange={handleVolumenChange}
    />
  </div>
)}
    </div>
  );
}

export default AudioPlayer;