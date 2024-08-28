import React from 'react';

const TaskSort = ({ sortCriteria, onSortChange }) => {
  return (
    <form className="usa-form">
      <label className="usa-label" htmlFor="sort">Sort by:</label>
      <select
        className="usa-select"
        id="sort"
        value={sortCriteria}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="none">- Select -</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
        <option value="priority">Priority</option>
      </select>
    </form>
  );
};

export default TaskSort;
