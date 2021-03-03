import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';
import filterOptions from '../../../assets/filter-options';

class TasksFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: filterOptions.displayAll,
    };
  }

  onViewCnahge = (evt) => {
    const { onFilterCnahge } = this.props;
    const clickedButton = evt.target;
    const filterButtons = evt.currentTarget.parentElement.parentElement.childNodes;

    filterButtons.forEach((button) => {
      if (button.firstChild === clickedButton) {
        if (!clickedButton.classList.contains('selected')) {
          clickedButton.classList.add('selected');
          this.setState(
            {
              show: evt.target.textContent,
            },
            () => {
              onFilterCnahge(this.state.show);
            }
          );
        }
      } else if (button.firstChild.classList.contains('selected')) {
        button.firstChild.classList.remove('selected');
      }
    });
  };

  render() {
    return (
      <ul className="filters">
        <li>
          <button className="selected" type="button" onClick={this.onViewCnahge} onKeyPress={this.onViewCnahge}>
            All
          </button>
        </li>
        <li>
          <button type="button" onClick={this.onViewCnahge} onKeyPress={this.onViewCnahge}>
            Active
          </button>
        </li>
        <li>
          <button type="button" onClick={this.onViewCnahge} onKeyPress={this.onViewCnahge}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  onFilterCnahge: PropTypes.func.isRequired,
};

export default TasksFilter;
