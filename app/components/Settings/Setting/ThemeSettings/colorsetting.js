"use client";

import React from "react";
import { useDispatch } from "react-redux";
import HeaderStyles from "../../header.module.scss";
import { setColors } from "../../../../../Redux/Slices/colorSlice";

export default function Colorsetting({ closeColorSetting, selectedId }) {
  const dispatch = useDispatch();
  const colors = [
    "#BA4949",
    "#a4893c",
    "#af4e91",
    "#545764",
    "#9675B4",
    "#7D53A2",
  ];

  const handleClick = (btnColor) => {
    const settingName = selectedId;
    dispatch(setColors({ settingName, value: btnColor }));
  };

  return (
    <div className={HeaderStyles.colorSetting} onClick={closeColorSetting}>
      <div className={HeaderStyles.container}>
        <div>
          <p>Color Setting</p>
        </div>
        <div>
          {colors.map((btn) => {
            return (
              <button
                key={btn}
                onClick={() => {
                  closeColorSetting(), handleClick(btn);
                }}
                style={{
                  background: btn,
                  boxShadow: `2px 2px 5px ${btn}`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
