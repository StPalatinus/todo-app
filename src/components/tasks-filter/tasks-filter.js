import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css'

class TasksFilter extends React.Component {

  constructor(props) {
  super(props);

    this.state = {
      show : "all",
    };
  }

  onViewCnahge = (e) => {
    
    const { onFilterCnahge } = this.props;
    const clickedButton = e.target;
    const filterButtons = e.currentTarget.childNodes;
    
    filterButtons.forEach((button, i) => {
      if (button.firstChild === clickedButton) {
        if (clickedButton.classList.contains("selected")) {
          return;
        } else {
          clickedButton.classList.add("selected");
          this.setState( {
              show: e.target.textContent,
          }, () => {
            onFilterCnahge(this.state.show);
          })
        }
      } else {
        if (button.firstChild.classList.contains("selected")) {
          button.firstChild.classList.remove("selected");
        }
      }
    });
  };

  render() {
    
    return (
      <ul className="filters" onClick={this.onViewCnahge}>
          <li>
            <button className="selected">All</button>
          </li>
          <li>
            <button>Active</button>
          </li>
          <li>
            <button>Completed</button>
          </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  onFilterCnahge: PropTypes.func,
}

export default TasksFilter;