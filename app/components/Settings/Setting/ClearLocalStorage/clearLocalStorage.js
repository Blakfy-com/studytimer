import React from "react";
import { useDispatch } from "react-redux";
import { resetPomoCount } from "@/Redux/Slices/timerSlice";

export default function ClearLocalStorage() {
  const dispatch = useDispatch();

  const clearLocalStorage = () => {
    const text = "All Task And Local Storage Clear ?";
    if (window.confirm(text)) {
      if (Notification.permission === "granted") {
        new Notification("Local Storage Cleared", {
          body: "Local Storage has been cleared successfully.",
        });
        dispatch(resetPomoCount());
        window.location.reload();
        alert("Local Storage Cleared Storage");
        localStorage.clear();
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Local Storage Cleared", {
              body: "Local Storage has been cleared successfully.",
            });
          }
        });
      }
    } else {
      alert(
        "Resetting the timer counter and local storage has been cancelled."
      );
    }
  };

  return (
    <div className="flex justify-between items-center ml-3 mr-4 opacity-[0.8]">
      <p>Clear Local Storage</p>
      <button
        className="h-[50px] w-[100px] ml-10 rounded-md hover:opacity-[0.7] hover:cursor-pointer"
        onClick={clearLocalStorage}>
        Submit
      </button>
    </div>
  );
}
