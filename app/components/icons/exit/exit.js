import React from "react";
import Image from "next/image";
export default function Exit() {
  return (
    <div>
      <Image
        src="/exit.svg" // SVG dosyasının yolunu doğru bir şekilde belirtin
        alt="exit"
        width={25}
        height={25}
      />
    </div>
  );
}
