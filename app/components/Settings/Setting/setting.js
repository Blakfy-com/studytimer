"use client";
import React from "react";
import Themesetting from "./ThemeSettings/themesetting";
import TimerSettings from "./TimerSettings/timersettings";
import LongBreakInterval from "./LongBreakInterval/longBreakInterval";
import HeaderStyles from "../header.module.scss";
import AudioSettings from "./AudioSettings/audiosettings";
import ExitSvg from "../../icons/exit/exit";
import ClearLocalStorage from "./ClearLocalStorage/clearLocalStorage";

export default function Setting({ closeSetting, handleColorClick }) {
  const handleCloseClick = () => {
    closeSetting(); // Setting Window Close
  };

  const smile = () => {
    const isTurkish = confirm("Turkish => Yes : English => No");

    if (isTurkish) {
      alert(
        "Maalesef 'kapat' işlevini henüz ekleyemedik, bu yüzden her değişiklik kaydediliyor. Ne diyebiliriz ki, yazılım dünyası da bizi bazen şaşırtıyor!"
      );
    } else {
      alert(
        "Sorry for the inconvenience, we haven't added the 'close' function yet, so every change you make is being recorded. Well, what can we say, the software world sometimes surprises us too!"
      );
    }
  };

  const handleReloadClick = () => {
    window.location.reload(); // Page Reload
    windows.location.closeSetting(); // Setting Window Close
  };

  return (
    <div className={HeaderStyles.setting}>
      <div className={HeaderStyles.container}>
        <div className={HeaderStyles.headerTitle}>
          <p>Settings</p>
          <ExitSvg handleClick={() => closeSetting()} />
        </div>
        <TimerSettings />
        <LongBreakInterval />
        <Themesetting handleButtonClick={handleColorClick} />
        <AudioSettings />
        <ClearLocalStorage />
        <div className={HeaderStyles.modal}>
          <button
            onClick={() => {
              handleCloseClick(), smile();
            }}>
            Close
          </button>
          <button onClick={handleReloadClick}>Save</button>
        </div>
      </div>
    </div>
  );
}
