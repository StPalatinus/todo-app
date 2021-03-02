import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

class TasksFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: 'all',
    };
  }

  onViewCnahge = (evt) => {
    const { onFilterCnahge } = this.props;
    const clickedButton = evt.target;
    // const filterButtons = e.currentTarget.childNodes;
    const filterButtons = evt.currentTarget.parentElement.parentElement.childNodes;

    // console.log(evt.currentTarget.parentElement.parentElement.childNodes);
    // console.log(this.state.show);

    filterButtons.forEach((button) => {
      // console.log(clickedButton.classList.contains("selected"));
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
        // if (clickedButton.classList.contains("selected")) {
        //   return false;
        // } else {
        //   clickedButton.classList.add("selected");
        //   this.setState( {
        //       show: e.target.textContent,
        //   }, () => {
        //     onFilterCnahge(this.state.show);
        //   })
        // }
      } else if (button.firstChild.classList.contains('selected')) {
        button.firstChild.classList.remove('selected');
        // if (button.firstChild.classList.contains("selected")) {
        //   button.firstChild.classList.remove("selected");
        // }
      }
    });
  };

  render() {
    return (
      <ul className="filters">
        {/* <ul className="filters" onClick={this.onViewCnahge}> */}
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

/* VERSION BEFORE EDIT
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
*/
