import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import TaskList from './components/task-list';
import Footer from './components/footer';
import './index.css';

class TodoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      tasksData: [],
      filterState: 'All',
      lastId: 0,
    };

    if (localStorage.getItem('todos')) {
      const restoredStae = this.loadTodosFromStorage('todos');
      this.state.tasksData = restoredStae;
      this.state.lastId = JSON.parse(localStorage.getItem('lastId'));
    } else {
      this.state.lastId = 0;
    }
  }

  countUnfinished = () => {
    const unfinishedTasksCount = this.state.tasksData.filter((task) => task.completed === false);
    return unfinishedTasksCount.length;
  };

  deleteTask = (id) => {
    // console.log(this.state);
    this.setState((state) => {
      const idx = state.tasksData.findIndex((task) => task.id === id);
      const newArr = [...state.tasksData.slice(0, idx), ...state.tasksData.slice(idx + 1)];
      this.saveLocalStorage(newArr);
      // console.log(newArr);

      return {
        tasksData: newArr,
      };
    });
  };

  editTask = (id) => {
    this.setState((state) => {
      const idx = this.state.tasksData.findIndex((task) => task.id === id);
      const oldStateChangedTask = state.tasksData.slice(idx, idx + 1);
      let newStateChangedTask = [{ ...oldStateChangedTask[0], completed: !oldStateChangedTask[0].completed }];
      newStateChangedTask = [{ ...oldStateChangedTask[0], editStatus: !oldStateChangedTask[0].editStatus }];
      const newArr = [...state.tasksData.slice(0, idx), ...newStateChangedTask, ...state.tasksData.slice(idx + 1)];
      this.saveLocalStorage(newArr);

      return {
        tasksData: newArr,
      };
    });
  };

  taskCompleteStateToggle = (id) => {
    this.setState((state) => {
      const idx = state.tasksData.findIndex((task) => task.id === id);
      const oldStateChangedTask = state.tasksData.slice(idx, idx + 1);
      const newStateChangedTask = [{ ...oldStateChangedTask[0], completed: !oldStateChangedTask[0].completed }];
      const newArr = [...state.tasksData.slice(0, idx), ...newStateChangedTask, ...state.tasksData.slice(idx + 1)];
      this.saveLocalStorage(newArr);

      return {
        tasksData: newArr,
      };
    });
  };

  addNewTask = (text) => {
    localStorage.setItem('lastId', JSON.stringify(this.state.lastId + 1));
    this.setState((state) => {
      const newTaskObj = {
        description: text,
        created: new Date(),
        editStatus: false,
        completed: false,
        id: (this.state.lastId += 1),
        workTime: 0,
      };
      const newArr = [...state.tasksData, newTaskObj];
      this.saveLocalStorage(newArr);

      return {
        tasksData: newArr,
      };
    });
  };

  changeFilterState = (showOnly) => {
    this.setState(() => ({
      filterState: showOnly,
    }));
  };

  changeTask = (taskText, id) => {
    this.setState((state) => {
      const idx = this.state.tasksData.findIndex((task) => task.id === id);
      const oldStateChangedTask = state.tasksData.slice(idx, idx + 1);
      let newStateChangedTask = [{ ...oldStateChangedTask[0], completed: !oldStateChangedTask[0].completed }];
      newStateChangedTask = [
        {
          ...oldStateChangedTask[0],
          description: taskText,
          editStatus: !oldStateChangedTask[0].editStatus,
        },
      ];
      const newArr = [...state.tasksData.slice(0, idx), ...newStateChangedTask, ...state.tasksData.slice(idx + 1)];
      this.saveLocalStorage(newArr);

      return {
        tasksData: newArr,
      };
    });
  };

  clearCompleted = () => {
    this.setState((state) => {
      const newState = [];
      state.tasksData.forEach((task) => {
        if (!task.completed) {
          newState.push(task);
        }
      });
      return {
        tasksData: newState,
      };
    });
  };

  saveTimerData = (timeElapsed, taskId) => {
    this.setState((state) => {
      const idx = this.state.tasksData.findIndex((task) => task.id === taskId);
      const oldStateChangedTask = state.tasksData.slice(idx, idx + 1);
      const newStateChangedTask = [{ ...oldStateChangedTask[0], workTime: timeElapsed }];

      const newArr = [...state.tasksData.slice(0, idx), ...newStateChangedTask, ...state.tasksData.slice(idx + 1)];
      this.saveLocalStorage(newArr);

      return {
        tasksData: newArr,
      };
    });
  };

  saveLocalStorage = (item) => {
    localStorage.setItem('todos', JSON.stringify(item));
  };

  loadTodosFromStorage = (item) => {
    const lsRestored = JSON.parse(localStorage.getItem(item));

    lsRestored.forEach((todoRestored) => {
      todoRestored.created = new Date(Date.parse(todoRestored.created));
    });

    return lsRestored;
  };

  render() {
    let taskField;
    const nodataStyle = {
      color: 'gray',
      fontSize: '24px',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      lineHeight: '2.4em',
      boxSizing: 'border-box',
      paddingLeft: '60px',
    };

    if (this.state.tasksData.length > 0) {
      // console.log(this.state.tasksData);
      taskField = (
        <TaskList
          tasksList={this.state.tasksData}
          filterState={this.state.filterState}
          onDelete={this.deleteTask}
          onEdit={this.editTask}
          taskCompleteStateToggle={this.taskCompleteStateToggle}
          onTaskChange={this.changeTask}
          saveTimerData={this.saveTimerData}
          workTime={this.state.workTime}
        />
      );
    } else {
      taskField = (
        <div className="nodata" style={nodataStyle}>
          No todos added yet
        </div>
      );
    }

    return (
      <section className="todoapp">
        <Header onTaskAdd={this.addNewTask} />
        <section className="main">
          {taskField}
          <Footer
            countUnfinished={this.countUnfinished}
            changeFilterState={this.changeFilterState}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('appbody'));
