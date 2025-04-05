import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from '../../TaskCard';
import './style.css'
import  SortedTask from '../../FilterDropdown'
const Tasks = () => {
  const tasks = useSelector((state) => state.tasks?.tasks || []);

  return (
    <div className="container">
        
      <div className='Tittle-all-tasks'>
      <h1>All Tasks</h1>
      </div>
      <div className='container'>
       {
        tasks.length ?  <SortedTask />:''
       }
        </div>
      {tasks.length ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p style={{ textAlign: "center", color: "gray", fontSize: "18px" }}>
          No tasks available!
        </p>
      )}
    </div>
  );
};

export default Tasks;
