import React, { useState, useEffect } from "react";
import { playSound, stopSound, SOUND_MAP } from "./playAudio";
import AudioCss from "../../header.module.scss";

const Audiosettings = () => {
  const storedVolume = localStorage.getItem("selectedVolume");
  const storedSound = localStorage.getItem("selectedSound");

  const [volume, setVolume] = useState(storedVolume || 50);
  const [selectedSound, setSelectedSound] = useState(storedSound || "alarm");

  useEffect(() => {
    // Herhangi bir değişiklikte localStorage'a kaydet
    localStorage.setItem("selectedVolume", volume);
  }, [volume]);

  useEffect(() => {
    // Herhangi bir değişiklikte localStorage'a kaydet
    localStorage.setItem("selectedSound", selectedSound);
  }, [selectedSound]);

  const handleVolumeChange = (event) => {
    const selectedVolume = event.target.value;
    setVolume(selectedVolume);
  };

  const handleSoundChange = (event) => {
    const selectedSound = event.target.value;
    setSelectedSound(selectedSound);
  };

  const playSoundDemo = () => {
    stopSound(); // Durdur ve sıfırla
    playSound(selectedSound, volume);
  };

  return (
    <div className={AudioCss.audiosettings}>
      <h3>Audio Setting</h3>
      <div>
        <select value={selectedSound} onChange={handleSoundChange}>
          {Object.keys(SOUND_MAP).map((soundKey) => (
            <option key={soundKey} value={soundKey}>
              {SOUND_MAP[soundKey].name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>{`${volume}%`}</span>
        <input
          type="range"
          id="volumeControl"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div>
        <button onClick={playSoundDemo}>Play Sound Test</button>
      </div>
    </div>
  );
};

export default Audiosettings;
