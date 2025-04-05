import React from "react";
import { useSelector } from "react-redux";
import TaskList from "../../TaskList";
import "./style.css";
import SortedTask from '../../FilterDropdown';

const SearchTasks = () => {
  const searchTerm = useSelector((state) => state.ui.searchTerm); 

  return (
    <>
      <div className="search-page-title">Search Results for "{searchTerm}"</div>
      <div className="container">
        {searchTerm ? <SortedTask /> : ''}
      </div>
      <TaskList searchTerm={searchTerm} /> 
    </>
  );
};

export default SearchTasks;
