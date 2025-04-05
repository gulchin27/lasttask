import React from 'react'
import { useSelector } from 'react-redux'
import './style.css'
import TaskCard from '../../TaskCard';
import  SortedTask from '../../FilterDropdown'
import {
  toggleComplete
} from "../../../Store/tasksSlice";
const index = () => {
  const tasks =useSelector((state)=>state.tasks?.tasks ||[])
  const completedtask=tasks.filter(task=>task.completed)
  return (
   <>
    <div className='title-Fullfiled'><h1>Fullfiled tasks</h1></div>
    <div className="container">
            { completedtask.length>0?(completedtask.map((task)=>
           <SortedTask/>  )) :''
          }
          
        {
          completedtask.length>0?(completedtask.map((task)=>
          <TaskCard key={task.id} task={task}/>))
             
          :
          ( 
             <p>No completed tasks!</p> 
            )

        }
      </div>
   </>
  )
}

export default index