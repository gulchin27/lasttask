import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import calendar from "./images/calendar.png";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { styled } from "@mui/material/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mui/material/styles';
import "./style.css";
import {  taskUpdateDeadline } from '../../Store/tasksSlice';
import {
  addTask,
  toggleImportant,
  toggleComplete,
} from "../../Store/tasksSlice";
import TaskCard from "../TaskCard";
import { v4 as uuidv4 } from "uuid";
import Filtirropdown from '../FilterDropdown'
const Layout = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.tasks || []);
  const [taskData, setTaskData] = useState({ title: "", text: "" });
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [selectedTask, setSelectedTask] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selectedDate && selectedDate.isValid()) {
      console.log("Selected Date changed to: ", selectedDate.format("YYYY-MM-DD"));
    } else {
      console.error("Invalid Date Selected");
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTask) {
      setNoteText(selectedTask.note || "");
    }
  }, [selectedTask]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  
    if (selectedTask) {
      dispatch(
        taskUpdateDeadline({
          id: selectedTask.id,
          deadline: newDate.format("YYYY-MM-DD"),
        })
      );
    }
  };
 
  const createTask = () => {
    if (!taskData.title.trim() || !taskData.text.trim()) {
      return;
    }

    if (!selectedDate || !selectedDate.isValid()) {
      return;
    }

    dispatch(
      addTask({
        id: uuidv4(),
        title: taskData.title,
        text: taskData.text,
        important: false,
        completed: false,
        deadline: selectedDate.format("YYYY-MM-DD"),
      })
    );

    setTaskData({ title: "", text: "" });
    setSelectedDate(dayjs());
  };


  return (
    <div className="container">
      <div className="Title-container">Add a task</div>
      <TextField
        label="Title"
        variant="standard"
        color="primary"
        className="tittle"
        onChange={handleChange}
        value={taskData.title}
        name="title"
      />
      <TextField
        label="Add a description"
        variant="standard"
        color="primary"
        className="tittle"
        onChange={handleChange}
        value={taskData.text}
        name="text"
        style={{ marginTop: "20px" }}
      />
      <div className="function-todo">
        <div className="btn-group">
          <button
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <img
              src={calendar}
              style={{ width: "20px", height: "20px" }}
              alt="calendar"
            />
          </button>
          <ul className="dropdown-menu date">
            <li>
              <button
                onClick={() => setSelectedDate(dayjs())}
                className="dropdown-item"
              >
                Today
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDate(dayjs().add(1, "day"))}
                className="dropdown-item"
              >
                Tomorrow
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDate(dayjs().add(7, "day"))}
                className="dropdown-item"
              >
                Next week
              </button>
            </li>
            <hr />
            <li>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Pick a date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </li>
          </ul>
        </div>
        <button className="createbutton btn-primary" onClick={createTask}>
          Create
        </button>
      </div>
      <Filtirropdown/>
      {Array.isArray(tasks) &&
        tasks.map((task) => (
          <TaskCard key={task.id} task={task}  />
        ))}

    </div>
  );
};

export default Layout;
