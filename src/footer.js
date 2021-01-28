import React from 'react';
import TasksFilter from './tasksfilter';

const Footer = () => {
    return (
      <footer className="footer">
      <span className="todo-count">1 items left</span>
      <span className="filters-wrapper">
        <TasksFilter/>
      </span>
      <button className="clear-completed">Clear completed</button>
    </footer>
    );
}; 

export default Footer;