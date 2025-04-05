import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Today from './components/Pages/Today';
import Important from './components/Pages/Important';
import Planned from './components/Pages/Planned';
import Tasks from './components/Pages/Tasks';
import SearchTasks from './components/Pages/SearchTasks';  
import Fullfiledtasks from './components/Pages/Fulfilled';
import Login from './components/Pages/Login';
import Registerpage from './components/Pages/Register';
import { useEffect } from "react";
import { useDispatch } from "react-redux"; 
import { setTasks } from "./Store/tasksSlice"; 

function App() {
  const dispatch = useDispatch(); 
  const userId = localStorage.getItem("userId");

  const savedTasks = JSON.parse(localStorage.getItem(`${userId}_tasks`)) || [];

  useEffect(() => {
    if (userId) { 
      dispatch(setTasks(savedTasks));
    }
  }, [userId, dispatch]); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/important" element={<><Navbar /><Important /></>} />
        <Route path="/planned" element={<><Navbar /><Planned /></>} />
        <Route path="/tasks" element={<><Navbar /><Tasks /></>} />
        <Route path="/searchtasks" element={<><Navbar /><SearchTasks /></>} /> 
        <Route path="/fullfiledtasks" element={<><Navbar /><Fullfiledtasks /></>} />
        <Route path="/today" element={<><Navbar /><Today /></>} />
      </Routes>
    </Router>
  );
}

export default App;

