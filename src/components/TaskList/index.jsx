import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from '../TaskCard';




import './style.css'
const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks) || [];
  const searchTerm = useSelector((state) => state.ui?.searchTerm || "");
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="Search-item-layout">


      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
    </>
  );
};

export default TaskList;