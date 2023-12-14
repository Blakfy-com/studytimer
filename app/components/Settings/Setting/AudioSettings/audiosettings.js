import React, { useState, useEffect } from "react";
import { useSound } from 'use-sound';
import HeaderStyles from "../../header.module.scss";

const AudioPage = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [playAlarm, { stop: stopAlarm }] = useSound('/Sound/alarm.mp3');
  const [playClick, { stop: stopClick }] = useSound('/Sound/church-bell.mp3');
  const [playCopperBell, { stop: stopCopperBell }] = useSound('/Sound/copper-bell.mp3');
  const [volume, setVolume] = useState(1);
  const [currentSound, setCurrentSound] = useState(null);

  const finalVolume = muted ? 0 : volume ** 2;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSoundButtonClick = (playFunction, stopFunction) => {
    if (stopFunction) {
      stopFunction();
    }

    setCurrentSound(() => playFunction);
  };

  useEffect(() => {
    if (currentSound) {
      currentSound({ volume: finalVolume });
    }
  }, [currentSound, finalVolume]);

  const stopAllSounds = () => {
    stopAlarm();
    stopClick();
    stopCopperBell();
  };

  return (
    <div className={HeaderStyles.audiosettings}>
    <div className="dropdown">
      <p>Sound</p>
      <br></br>
      <button onClick={toggleDropdown} className="dropbtn">
        Sound
      </button>
      {dropdownVisible && (
        <div id="myDropdown" className="dropdown-content">
          <button onClick={() => handleSoundButtonClick(playAlarm, stopAllSounds)}>Alarm</button>
          <br></br>
          <button onClick={() => handleSoundButtonClick(playClick, stopAllSounds)}>Church Bell</button>
          <br></br>
          <button onClick={() => handleSoundButtonClick(playCopperBell, stopAllSounds)}>Copper Bell</button>
        </div>  
      )}
      <main>
        <section>
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={(event) => {
              setVolume(event.target.valueAsNumber);
            }}
          />
        </section>
      </main>
    </div>
  </div>
  );
};

export default AudioPage;
