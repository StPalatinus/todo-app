import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from './tasks-filter';
import './footer.css';

const Footer = ({ countUnfinished, changeFilterState, clearCompleted }) => {
  Footer.defaultProps = {
    countUnfinished: () => {},
  };

  const onFilterCnahge = (showOnly) => {
    changeFilterState(showOnly);
  };

  // const unfinishedTasks = countUnfinished();

  return (
    <footer className="footer">
      <span className="todo-count">{countUnfinished()} items left</span>
      <span className="filters-wrapper">
        <TasksFilter onFilterCnahge={onFilterCnahge} />
      </span>
      <button className="clear-completed" type="button" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  countUnfinished: PropTypes.func,
  changeFilterState: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
