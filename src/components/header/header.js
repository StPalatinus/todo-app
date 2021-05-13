import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './header.css';

const Header = (props) => {
  const { onTaskAdd } = props;

  const [newTaskValue, setNewTaskValue] = useState('');

  const onButtonEnter = (evt) => {
    setNewTaskValue(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (newTaskValue === '') {
      return false;
    }
    onTaskAdd(newTaskValue);
    setNewTaskValue('');
    return true;
  };

  return (
    <header className="header" onSubmit={onSubmit}>
      <h1>todos</h1>
      <form className="todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onButtonEnter}
          autoFocus
          value={newTaskValue}
        />
      </form>
    </header>
  );
};

Header.propTypes = {
  onTaskAdd: PropTypes.func.isRequired,
};

export default Header;
