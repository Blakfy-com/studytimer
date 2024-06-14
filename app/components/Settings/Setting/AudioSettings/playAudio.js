// playAudio.js

export const SOUND_MAP = {
  alarmFire: { name: "Alarm", file: "/Sound/alarm-fire-alarm.mp3" },
  churchBell: { name: "Church Bell", file: "/Sound/church-bell.mp3" },
  copperBell: { name: "Copper Bell", file: "/Sound/copper-bell.mp3" },
  bellRinging: {
    name: "Bell Ringing",
    file: "/Sound/alarmclock-bell-ringing.mp3",
  },
};

let audioElement = null;

export const setAudioElement = (element) => {
  audioElement = element;
};

export const playSound = (selectedSound, volume) => {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  const audio = new Audio(SOUND_MAP[selectedSound].file);
  audio.volume = volume / 100;
  audio.play();
  setAudioElement(audio);
};

export const stopSound = () => {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
};

export const playDemoSound = () => {
  console.log("Playing demo sound");
  // Buraya demo sesi çalmak için gerekli kodları ekle.
};
