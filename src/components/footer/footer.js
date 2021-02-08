import React from 'react';
import TasksFilter from '../tasks-filter';
import './footer.css'

const Footer = ({countUnfinished}) => {

  const unfinishedTCount = countUnfinished();
  
    return (
      <footer className="footer">
      <span className="todo-count">{unfinishedTCount} items left</span>
      <span className="filters-wrapper">
        <TasksFilter/>
      </span>
      <button className="clear-completed">Clear completed</button>
    </footer>
    );
}; 

export default Footer;