import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleComplete, toggleImportant } from '../../Store/tasksSlice';
import {useState} from 'react'
import check from "./images/check.png";
import remove from "./images/delete.png";
import star from './images/star.png';
import starfill from './images/starfill.png'
import checkfill from './images/checkfill.png'
import DateRangeIcon from '@mui/icons-material/DateRange';
import { FiMinus } from "react-icons/fi";
import dayjs from 'dayjs';
import './style.css'
const TaskCard = ({ task, onOpenSidebar }) => {  
  const dispatch = useDispatch();
  const updateDate = useSelector((state)=>
    state.tasks.tasks.find((t)=>t.id==task.id)
  )
  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""}`}
    >
      <div className="description-task">
      <h2 className={task.completed ? "completed-text" : ""}>{task.title}</h2>
      <span className={task.completed ? "completed-text" : ""}>{task.text}</span>
      </div>
      <div className="change-task">
        <div className="deadline-span">

          {updateDate.deadline &&  dayjs(updateDate.deadline).isValid()
            ?<> <DateRangeIcon/> {dayjs(updateDate.deadline).format("DD-MM-YYYY")} </>
            :""}
        </div>
        
        <div className="buttons">
        
            <button
            className={`btn btn-primary func`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteTask(task.id));
            }}
          >
            <img className="remove" src={remove} alt="Delete" />
          </button>
            <button
            className={`btn func btn-primary`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleImportant(task.id));
            }}
          >
            {task.important ? (
              <img className="remove" src={starfill} alt="Important" />
            ) : (
              <img className="remove" src={star} alt="Not Important" />
            )}
          </button>
          
          <button
            className="btn func btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleComplete(task.id));
     
            }}
          >
            {task.completed ? (
              <img className="remove" src={checkfill} alt="Check" />
            ) : (
              <img className="remove" src={check} alt="Check" />
            )}
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
