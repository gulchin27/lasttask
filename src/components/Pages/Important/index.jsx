import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from '../../TaskCard';
import './style.css';
import  SortedTask from '../../FilterDropdown'
const Important = () => {
  const tasks = useSelector((state) => state.tasks?.tasks || []);
  const importantTasks = tasks.filter(task => task.important); 
  return (
    <>
      <div className='title'>
        <h1>Important Tasks</h1>
      </div>
      <div className="container">
      {importantTasks.length > 0 ?  <SortedTask />:''}
        {importantTasks.length > 0 ? (
          importantTasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>No important tasks!</p>
        )}
      </div>
    </>
  );
};

export default Important;
