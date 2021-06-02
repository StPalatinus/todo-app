import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';
import filterOptions from '../../../assets/filter-options';

const TasksFilter = (props) => {
  const [show, setShow] = useState(filterOptions.displayAll);

  const { onFilterCnahge } = props;

  const onViewCnahge = (evt) => {
    const clickedButton = evt.target;
    const filterButtons = evt.currentTarget.parentElement.parentElement.childNodes;

    filterButtons.forEach((button) => {
      if (button.firstChild === clickedButton) {
        if (!clickedButton.classList.contains('selected')) {
          clickedButton.classList.add('selected');
          setShow(evt.target.textContent);
        }
      } else if (button.firstChild.classList.contains('selected')) {
        button.firstChild.classList.remove('selected');
      }
    });
  };

  useEffect(() => {
    onFilterCnahge(show);
  }, [show]);

  return (
    <ul className="filters">
      <li>
        <button className="selected" type="button" onClick={onViewCnahge} onKeyPress={onViewCnahge}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={onViewCnahge} onKeyPress={onViewCnahge}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={onViewCnahge} onKeyPress={onViewCnahge}>
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  onFilterCnahge: PropTypes.func.isRequired,
};

export default TasksFilter;
