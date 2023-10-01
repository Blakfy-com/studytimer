import React, { useEffect, useState } from "react";
import NewTask from "./newTask";
import Task from "./task";
import AddTask from "./addTask";
import { useSelector, useDispatch } from "react-redux";
import { deleteData, incPomoCount } from "@/Redux/Slices/taskSlice";

export default function TodoList() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dataAnalysis);
  const { settings } = useSelector((state) => state.timerSetting);
  const [isView, setIsView] = useState(false);

  const openNewTask = () => {
    setIsView(!isView);
  };

  const removeData = (itemKey) => {
    dispatch(deleteData(itemKey));
  };

  return (
    <>
      <div>
        {data.length > 0 ? (
          data.map((todo) => (
            <Task
              key={todo.key}
              text={todo.text}
              sessionCount={todo.totalSessions}
              activeSession={todo.currentSession}
              //** deleteItem fonksiyonu redux uzerinden bagli oldugu key bakilarak silme islemi calisiyor. */
              deleteItem={() => removeData(todo.key)}
            />
          ))
        ) : (
          <></>
        )}
      </div>

      {/* Open The New Task Components */}
      <AddTask onAdd={openNewTask} />

      {isView ? (
        <NewTask savesTask={openNewTask} cancelTask={openNewTask} />
      ) : null}
    </>
  );
}
