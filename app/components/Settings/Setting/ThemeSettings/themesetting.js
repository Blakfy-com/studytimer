"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import HeaderStyles from "../../header.module.scss";

export default function Themesetting({ handleButtonClick }) {
  const focusColor = useSelector(
    (state) => state.colorSettings.colorSettings.focusColor
  );
  const shortBreakColor = useSelector(
    (state) => state.colorSettings.colorSettings.shortBreakColor
  );
  const longBreakColor = useSelector(
    (state) => state.colorSettings.colorSettings.longBreakColor
  );

  const buttons = [
    {
      key: "focusColor",
      background: focusColor,
    },
    {
      key: "shortBreakColor",
      background: shortBreakColor,
    },
    {
      key: "longBreakColor",
      background: longBreakColor,
    },
  ];

  return (
    <div className={HeaderStyles.themesetting}>
      <p>Theme</p>
      <div>
        <p>Color Theme</p>
        <div>
          {buttons.map((btn) => {
            return (
              <button
                key={btn.key}
                onClick={() => handleButtonClick(btn.key)}
                style={{ background: btn.background }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
