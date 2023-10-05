"use client";

import React, { useState } from "react";
import HeaderStyles from "../../header.module.scss";

function Colorsetting({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={HeaderStyles.colorsetting}>
      <div className={HeaderStyles.colorsetting}>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Colorsetting;
