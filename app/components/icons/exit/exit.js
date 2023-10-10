import React from "react";
import Image from "next/image";
export default function Exit({ handleClick }) {
  return (
    <>
      <Image
        src="/exit.svg" // SVG dosyasının yolunu doğru bir şekilde belirtin
        alt="exit"
        width={25}
        height={25}
        onClick={handleClick}
      />
    </>
  );
}
