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
          created: new Date() - 1020000,
          showField: false,
          completed: true,
          id: 1,
        },
        {
          description: 'Editing task',
          created: new Date() - 300000,
          showField: true,
          completed: false,
          id: 2,
        },
        {
          description: 'Active task',
          created: new Date() - 300000,
          showField: false,
          completed: true,
          id: 3,
        },
      ]
    };
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

  taskStateChange = (id) => {
    console.log(id);
    this.setState((state) => {

      const idx = state.tasksData.findIndex((task) => task.id === id);
      
      let stateChangedTask = state.tasksData.slice(idx, idx + 1);
 
      stateChangedTask[0].completed = !stateChangedTask[0].completed;

      const newArr =[ ...state.tasksData.slice(0, idx), ...stateChangedTask, ...state.tasksData.slice(idx + 1) ];

      return {
        tasksData: newArr
      };
    })
  };

  addNewTask = (text) => {
    
    this.setState((state) => {

      const newTaskObj = {
        description: text,
          created: new Date() - 1,
          showField: false,
          completed: false,
          id: this.directId++,
      }

      const newArr =[ ...state.tasksData, newTaskObj];
      
      return {
        tasksData: newArr
      };
    })
  };

  render() {
  
    return (
      <section className="todoapp">
          <Header 
          onTaskAdd = {this.addNewTask}/>
        <section className="main">
          <TaskList 
              tasksList ={ this.state.tasksData }
              onDelete = { this.deleteTask } 
              taskStateChange = {this.taskStateChange}/>
          <Footer />
        </section>
      </section>
    );
  };
}

ReactDOM.render(<TodoApp />,
  document.getElementById('appbody'));