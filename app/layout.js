"use client";

import "./globals.css";
import { Provider } from "react-redux";
import store from "../Redux/store";

const metadata = {
  title: {
    default: "Study Timerr",
    template: "%s | Pomodoro Timer",
  },
  image: {
    src: "/focusIcon.png",
    type: "Fav-icon",
    rel: "icon",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel={metadata.image.rel}
        type={metadata.image.type}
        href={metadata.image.src}
      />
      <title>{metadata.title.default}</title>
      <body suppressHydrationWarning={true}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}

// suppressHydrationWarning={true} <= Do your research on what it is used for. !!!
