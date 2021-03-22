import React from 'react';
import PropTypes from 'prop-types';

import './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    const { onTaskAdd } = this.props;

    this.state = {
      newTaskValue: '',
    };

    this.onButtonEnter = (evt) => {
      this.setState(() => ({
        newTaskValue: evt.target.value,
      }));
    };

    this.onSubmit = (evt) => {
      evt.preventDefault();
      if (this.state.newTaskValue === '') {
        return false;
      }
      onTaskAdd(this.state.newTaskValue);
      this.setState({
        newTaskValue: '',
      });
      return true;
    };
  }

  //---

  render() {
    return (
      <header className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <form className="todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onButtonEnter}
            autoFocus
            value={this.state.newTaskValue}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  onTaskAdd: PropTypes.func.isRequired,
};

export default Header;
