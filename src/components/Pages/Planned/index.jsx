import React from 'react'
import { useSelector } from 'react-redux';
import TaskCard from '../../TaskCard'
import './style.css'
import dayjs from 'dayjs';
import  SortedTask from '../../FilterDropdown'
const Planned = () => {
    const tasks = useSelector((state) => state.tasks?.tasks || []);
    const plannedTasks = tasks.filter(
      (task)=>task.deadline && dayjs(task.deadline).isValid()
    );
  
    return (
      <div className='container-planned-task'>
        <div className='Title-planned-task'>
        <h1>Planned Tasks</h1>
        </div>
        <div className='container'>
         {plannedTasks.length > 0 ?
          <SortedTask />:''
         }
        
        </div>
       
        {plannedTasks.length > 0 ? (
          <div className='planned-task'>
            {plannedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>No tasks</div>
        )}
      </div>
    );
  };
  

export default Planned