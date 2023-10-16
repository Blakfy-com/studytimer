import React from "react";

export default function ClearLocalStorage() {
  const clearLocalStorage = () => {
    const text = "ALL TASK AND LOCAL STORAGE CLEAR ?";
    if (window.confirm(text)) {
      dispatch(resetPomoCount());
      localStorage.clear();
      window.location.reload();
      alert("LOCAL STORAGE CLEARED");
    } else {
      alert(
        "Resetting the timer counter and local storage has been cancelled."
      );
    }
  };

  return (
    <div className="flex  justify-between ml-3 mr-3">
      <p>Clear Local Storage</p>
      <button onClick={clearLocalStorage}>Submit</button>
    </div>
  );
}
