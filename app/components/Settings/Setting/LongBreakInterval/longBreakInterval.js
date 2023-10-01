import React from "react";
import HeaderStyles from "../../header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTimer } from "@/Redux/Slices/timerSlice";

export default function LongBreakInterval() {
  const dispatch = useDispatch();
  const { timerList } = useSelector((state) => state.timerSetting);

  // TimerList öğelerini formatlayarak kullanımı kolaylaştırın
  const activeTimer = timerList[5].value; // timerSlice ActiveTimer value degeri
  const onChange = (e) => {
    const newItem = e.target.value;
    dispatch(setActiveTimer(newItem));
  };

  return (
    <div className={HeaderStyles.longBreakInterval}>
      <div>
        <div>
          <p>Long Break Interval</p>
        </div>
        <div>
          <input
            type="number"
            onChange={onChange}
            value={activeTimer} // timerSlice ActiveTimer value degeri
            min="1"
            max="60"
          />
        </div>
      </div>
    </div>
  );
}
