// waiting
import NewTask from "./newTask";
import React from "react";
import { useSelector } from "react-redux";

function EditTask(props) {
  const { data } = useSelector((state) => state.dataAnalysis);

  const updateData = data.find((item) => item.key === props.openId);
  return (
    <div>
      <NewTask
        savesTask={() => props.cancelTask()}
        cancelTask={() => props.cancelTask()}
      />
    </div>
  );
}

export default EditTask;
