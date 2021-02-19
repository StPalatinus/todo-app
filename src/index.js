import React from 'react';
import ReactDOM from 'react-dom'
import Header from './components/header';
import TaskList  from './components/task-list';
import Footer from './components/footer';
import './index.css';

class TodoApp extends React.Component {
  constructor() {
  super();

   this.directId = 100;

    this.state = {
      tasksData: [
        {
          description: 'Completed task',
          created: new Date(new Date() - 1020000),
          editStatus: false,
          completed: true,
          id: 1,
        },
        {
          description: 'Test task',
          created: new Date(new Date() - 300000),
          editStatus: false,
          completed: false,
          id: 2,
        },
        {
          description: 'Active task',
          created: new Date(new Date() - 300000),
          editStatus: false,
          completed: false,
          id: 3,
        },
      ],
      filterState: "All",
    };
  }

  countUnfinished = () => {
    let unfinishedTasksCount = this.state.tasksData.filter((task) => {
      return task.completed === false;
    }); 
    return unfinishedTasksCount.length;
  }
  
  deleteTask = (id) => {
    this.setState((state) => {

      const idx = state.tasksData.findIndex((task) => task.id === id);
      const newArr =[ ...state.tasksData.slice(0, idx), ...state.tasksData.slice(idx + 1) ];
      
      return {
        tasksData: newArr
      };
    })
  };

  editTask = (id) => {
    this.setState((state) => {

      const idx = this.state.tasksData.findIndex((task) => task.id === id);
      const oldStateChangedTask = state.tasksData.slice(idx, idx + 1);
      let newStateChangedTask = [{...oldStateChangedTask[0], completed: !oldStateChangedTask[0].completed }]      
      newStateChangedTask = [{...oldStateChangedTask[0], editStatus: !oldStateChangedTask[0].editStatus}]
      const newArr =[ ...state.tasksData.slice(0, idx), ...newStateChangedTask, ...state.tasksData.slice(idx + 1) ];

      return {
        tasksData: newArr
      };
    })
  };

  taskCompleteStateToggle = (id) => {
    
    this.setState((state) => {

      const idx = state.tasksData.findIndex((task) => task.id === id);
      const oldStateChangedTask = state.tasksData.slice(idx, idx + 1);
      const newStateChangedTask = [{...oldStateChangedTask[0], completed: !oldStateChangedTask[0].completed }]      
      const newArr =[ ...state.tasksData.slice(0, idx), ...newStateChangedTask, ...state.tasksData.slice(idx + 1) ];

      return {
        tasksData: newArr
      };
    })
  };

  addNewTask = (text) => {
    
    this.setState((state) => {

      const newTaskObj = {
        description: text,
          created: new Date(),
          editStatus: false,
          completed: false,
          id: this.directId++,
      }

      const newArr =[ ...state.tasksData, newTaskObj];
      
      return {
        tasksData: newArr
      };
    })
  };

  changeFilterState = (showOnly) => {

    this.setState( () => {
      return {
        filterState: showOnly
      };
    });
  };

  changeTask = (taskText, id) => {

    this.setState((state) => {

      const idx = this.state.tasksData.findIndex((task) => task.id === id);
      const oldStateChangedTask = state.tasksData.slice(idx, idx + 1);
      let newStateChangedTask = [{...oldStateChangedTask[0], completed: !oldStateChangedTask[0].completed }]
      newStateChangedTask = [{...oldStateChangedTask[0], description: taskText, editStatus: !oldStateChangedTask[0].editStatus}]
      const newArr =[ ...state.tasksData.slice(0, idx), ...newStateChangedTask, ...state.tasksData.slice(idx + 1) ];

      return {
        tasksData: newArr
      };
    })
  }

  clearCompleted = () => {
    this.setState((state) => {
      let newState = []
      state.tasksData.forEach((task) => {
         if (!task.completed) {
            newState.push(task);
          } ;
      });
      return {
        tasksData: newState
      }
    })
  }

  render() {

    let taskField;
    let nodataStyle = {
      color: "gray",
      fontSize: "24px",
      fontFamily: "inherit",
      fontWeight: "inherit",
      lineHeight: "2.4em",
      boxSizing: "border-box",
      paddingLeft: "60px",
    }

    if (this.state.tasksData.length > 0) {
      taskField = <TaskList 
                    tasksList ={ this.state.tasksData }
                    filterState = {this.state.filterState}
                    onDelete = { this.deleteTask } 
                    onEdit = { this.editTask } 
                    taskCompleteStateToggle = {this.taskCompleteStateToggle} 
                    onTaskChange = {this.changeTask} />
    } else {
      taskField = <div className="nodata" style={ nodataStyle }>No todos added</div>
    }

    return (
      <section className="todoapp">
          <Header 
          onTaskAdd = {this.addNewTask} 
          />
        <section className="main">
          { taskField }
          <Footer countUnfinished = {this.countUnfinished}
                  changeFilterState = {this.changeFilterState}
                  clearCompleted = {this.clearCompleted} />
        </section>
      </section>
    );
  };
}

ReactDOM.render(<TodoApp />,
  document.getElementById('appbody'));