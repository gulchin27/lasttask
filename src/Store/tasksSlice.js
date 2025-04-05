import { createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs';

const userId = localStorage.getItem("userId") || "guest"; 

const savedTasks = JSON.parse(localStorage.getItem(`${userId}_tasks`)) || [];
const uploadedFiles = JSON.parse(localStorage.getItem(`${userId}_files`)) || [];
const addNotes = JSON.parse(localStorage.getItem(`${userId}_notes`)) || [];

const initialState = {
  userId, 
  tasks: savedTasks,
  files: uploadedFiles,
  notes: addNotes,
  sortedTasks: [],
};

const saveToLocalStorage = (userId, key, value) => {
  if (userId) {
    localStorage.setItem(`${userId}_${key}`, JSON.stringify(value));
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
      

      state.tasks = JSON.parse(localStorage.getItem(`${action.payload}_tasks`)) || [];
      state.files = JSON.parse(localStorage.getItem(`${action.payload}_files`)) || [];
      state.notes = JSON.parse(localStorage.getItem(`${action.payload}_notes`)) || [];
    },
    logoutUser: (state) => {
      state.userId = "guest";
      state.tasks = [];
      localStorage.removeItem("userId");

    }
,     
setTasks: (state, action) => {
  state.tasks = action.payload;
},
    sortTasksByDate: (state, action) => {
      const order = action.payload;
      state.tasks = [...state.tasks].sort((a, b) => {
        return order === "asc"
          ? dayjs(a.deadline).isAfter(dayjs(b.deadline)) ? 1 : -1
          : dayjs(a.deadline).isBefore(dayjs(b.deadline)) ? 1 : -1;
      });
    },

    sortTaskByImportant: (state) => {
      state.tasks.sort((a, b) => {
        if (a.important === b.important) {
          return new Date(a.date) - new Date(b.date); 
        }
        return b.important - a.important;
      });
    },

    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveToLocalStorage(state.userId, "tasks", state.tasks);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveToLocalStorage(state.userId, "tasks", state.tasks);
    },

    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToLocalStorage(state.userId, "tasks", state.tasks);
      }
    },

    toggleImportant: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.important = !task.important;
        saveToLocalStorage(state.userId, "tasks", state.tasks);
      }
    },

    taskUpdateDeadline: (state, action) => {
      const { id, deadline } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.deadline = deadline;
        saveToLocalStorage(state.userId, "tasks", state.tasks);
      } 
    },

    addFile: (state, action) => {
      state.files.push(...action.payload);
      saveToLocalStorage(state.userId, "files", state.files);
    },

    updateNote: (state, action) => {
      const { id, note } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.note = note;
        saveToLocalStorage(state.userId, "tasks", state.tasks);
      }
    },

    deleteFile: (state, action) => {
      state.files = state.files.filter(file => file.id !== action.payload);
      saveToLocalStorage(state.userId, "files", state.files);
    }
  },
});

export const {
  setUserId,
  addTask,
  deleteTask,
  toggleComplete,
  toggleImportant,
  taskUpdateDeadline,
  addFile,
  deleteFile,
  updateNote,
  sortTasksByDate,
  sortTaskByImportant,
  setTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;
