import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../Store/uiSlice';
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { IoSearch } from "react-icons/io5";
import icon from './images/todo.png';
import './style.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.ui.searchTerm);
  const [searchInput, setSearchInput] = useState(searchTerm || "");

  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    dispatch(setSearchTerm(searchInput));
    if (window.location.pathname !== "/searchtasks") {
      navigate('/searchtasks');
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    dispatch(setSearchTerm(""));
    if (window.location.pathname !== "/") {
      navigate('/today');
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img className="icon" src={icon} alt="Todo icon" />
        <Link to="/today" className='taskmate-name'>TaskMate</Link>
      </div>

      <div className="navbar-link">
        <Link to="/today">Today</Link>
        <Link to="/important">Important</Link>
        <Link to="/planned">Planned</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/fullfiledtasks">Fulfilled</Link>
      </div>
 <div className='searc-log'>
 <form className="search-form" role="search" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <span className="clear-icon" onClick={clearSearch}>&#10005;</span>
          )}
        </div>
        <button className="btn btn-outline-success search" type="submit">
          <IoSearch />
        </button>
      </form>

      <button type="button" className="btn btn-outline-danger logout-btn" onClick={handleLogout}>
  <LogoutIcon className="icon-logout" />
  <span className="logout-text">Logout</span>
</button>
 </div>
     
    </nav>
  );
};

export default Navbar;
