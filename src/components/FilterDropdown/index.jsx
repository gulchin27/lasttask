import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortTasksByDate,sortTaskByImportant } from "../../Store/tasksSlice";
import { FaSortAmountDown } from "react-icons/fa";
import './style.css'
const FilterDropdown = () => {
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (event) => {
    const sortOrder = event.target.getAttribute("value");
    setSortOrder(sortOrder);
    dispatch(sortTasksByDate(sortOrder)); 
    dispatch(sortTaskByImportant(sortOrder))
  };
   
  return (
    <div className="btn-group sort-drop">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
      <FaSortAmountDown/>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button className="dropdown-item" type="button" value="asc" onClick={handleSortChange}>
            Oldest First
          </button>
        </li>
        <li>
          <button className="dropdown-item" type="button" value="desc" onClick={handleSortChange}>
            Newest First
          </button>
        </li>
        <li>
          <button className="dropdown-item" type="button" value="asc" onClick={handleSortChange}>
           First important
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterDropdown;
