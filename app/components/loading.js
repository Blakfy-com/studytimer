import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      {/* Yükleme animasyonu burada olacak */}
      <p className="text-4xl font-extrabold">
        Loading
        <span className="animate-pulse">
          <span className="dot1">.</span>
          <span className="dot2">.</span>
          <span className="dot3">.</span>
        </span>
      </p>
    </div>
  );
}
