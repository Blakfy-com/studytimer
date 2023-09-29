import React from "react";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <p className="text-center text-gray-300 text-sm">Yükleniyor...</p>
    </div>
  );
}
