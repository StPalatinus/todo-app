import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/header';
import TaskList from './components/task-list';
import Footer from './components/footer';
import './index.css';
import filterOptions from './assets/filter-options';
import storage from './assets/storage';

const TodoApp = () => {
  const [state, setState] = React.useState({
    tasksData: [],
    filterState: filterOptions.displayAll,
    usedIdsArr: [],
  });

  const loadtodosFromStorage = (item) => {
    const lsRestored = JSON.parse(localStorage.getItem(item));

    lsRestored.forEach((todoRestored) => {
      todoRestored.created = new Date(Date.parse(todoRestored.created));
    });
    return lsRestored;
  };

  React.useEffect(() => {
    if (localStorage.getItem('todos')) {
      const restoredStae = loadtodosFromStorage('todos');

      setState((prevState) => ({
        ...prevState,
        tasksData: restoredStae,
      }));
      setState((prevState) => ({
        ...prevState,
        usedIdsArr: JSON.parse(localStorage.getItem('usedIdsArr')),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        usedIdsArr: [],
      }));
    }
  }, []);

  const countUnfinished = () => {
    const unfinishedTasksCount = state.tasksData.filter((task) => task.completed === false);
    return unfinishedTasksCount.length;
  };

  const deleteTask = (id) => {
    setState((prevState) => {
      const idx = prevState.tasksData.findIndex((task) => task.id === id);
      const idInArr = prevState.tasksData.findIndex((arrId) => arrId.id === id);
      const newArr = [...prevState.tasksData.slice(0, idx), ...prevState.tasksData.slice(idx + 1)];
      const newUsedIdsArr = [...prevState.usedIdsArr.slice(0, idInArr), ...prevState.usedIdsArr.slice(idInArr + 1)];

      storage.saveTodosToStorage(newArr);
      storage.saveUsedIdsArrToStorage(newUsedIdsArr);

      return {
        ...prevState,
        tasksData: newArr,
        usedIdsArr: newUsedIdsArr,
      };
    });
  };

  const editTask = (id) => {
    setState((prevState) => {
      const idx = prevState.tasksData.findIndex((task) => task.id === id);
      const oldStateChangedTask = prevState.tasksData.slice(idx, idx + 1);
      let newStateChangedTask = [{ ...oldStateChangedTask[0], completed: !oldStateChangedTask[0].completed }];
      newStateChangedTask = [{ ...oldStateChangedTask[0], editStatus: !oldStateChangedTask[0].editStatus }];
      const newArr = [
        ...prevState.tasksData.slice(0, idx),
        ...newStateChangedTask,
        ...prevState.tasksData.slice(idx + 1),
      ];
      storage.saveTodosToStorage(newArr);

      return {
        ...prevState,
        tasksData: newArr,
      };
    });
  };

  const taskCompleteStateToggle = (id) => {
    setState((prevState) => {
      const idx = prevState.tasksData.findIndex((task) => task.id === id);
      const oldStateChangedTask = prevState.tasksData.slice(idx, idx + 1);
      const newStateChangedTask = [{ ...oldStateChangedTask[0], completed: !oldStateChangedTask[0].completed }];
      const newArr = [
        ...prevState.tasksData.slice(0, idx),
        ...newStateChangedTask,
        ...prevState.tasksData.slice(idx + 1),
      ];
      storage.saveTodosToStorage(newArr);

      return {
        ...prevState,
        tasksData: newArr,
      };
    });
  };

  const generateId = () => {
    const nextId = uuidv4();

    return nextId;
  };

  const addNewTask = (text) => {
    setState((prevState) => {
      let nextId = generateId();
      /* eslint no-loop-func: "off" */
      while (prevState.usedIdsArr.find((id) => id === nextId)) {
        nextId = generateId();
      }

      const oldIdsArr = prevState.usedIdsArr.map((id) => id);
      const newIdsArr = [...oldIdsArr, nextId];

      storage.saveUsedIdsArrToStorage(newIdsArr);

      const newTaskObj = {
        description: text,
        created: new Date(),
        editStatus: false,
        completed: false,
        id: nextId,
        workTime: 0,
      };
      const newArr = [...prevState.tasksData, newTaskObj];
      storage.saveTodosToStorage(newArr);

      return {
        ...prevState,
        tasksData: newArr,
        usedIdsArr: newIdsArr,
      };
    });
  };

  const changeFilterState = (showOnly) => {
    setState((prevState) => ({
      ...prevState,
      filterState: showOnly,
    }));
  };

  const changeTask = (taskText, id) => {
    setState((prevState) => {
      const idx = prevState.tasksData.findIndex((task) => task.id === id);
      const oldStateChangedTask = prevState.tasksData.slice(idx, idx + 1);
      let newStateChangedTask = [{ ...oldStateChangedTask[0], completed: !oldStateChangedTask[0].completed }];
      newStateChangedTask = [
        {
          ...oldStateChangedTask[0],
          description: taskText,
          editStatus: !oldStateChangedTask[0].editStatus,
        },
      ];
      const newArr = [
        ...prevState.tasksData.slice(0, idx),
        ...newStateChangedTask,
        ...prevState.tasksData.slice(idx + 1),
      ];
      storage.saveTodosToStorage(newArr);

      return {
        ...prevState,
        tasksData: newArr,
      };
    });
  };

  const clearCompleted = () => {
    setState((prevState) => {
      const newState = [];
      prevState.tasksData.forEach((task) => {
        if (!task.completed) {
          newState.push(task);
        }
      });
      return {
        ...prevState,
        tasksData: newState,
      };
    });
  };

  const saveTimerData = (timeElapsed, taskId) => {
    setState((prevState) => {
      const idx = prevState.tasksData.findIndex((task) => task.id === taskId);
      const oldStateChangedTask = state.tasksData.slice(idx, idx + 1);
      const newStateChangedTask = [{ ...oldStateChangedTask[0], workTime: timeElapsed }];

      const newArr = [
        ...prevState.tasksData.slice(0, idx),
        ...newStateChangedTask,
        ...prevState.tasksData.slice(idx + 1),
      ];
      storage.saveTodosToStorage(newArr);

      return {
        ...prevState,
        tasksData: newArr,
      };
    });
  };

  const nodataStyle = {
    color: 'gray',
    fontSize: '24px',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    lineHeight: '2.4em',
    boxSizing: 'border-box',
    paddingLeft: '60px',
  };

  const renderTaskfield = () => {
    let taskField;

    if (state.tasksData.length > 0) {
      taskField = (
        <TaskList
          tasksList={state.tasksData}
          filterState={state.filterState}
          onDelete={deleteTask}
          onEdit={editTask}
          taskCompleteStateToggle={taskCompleteStateToggle}
          onTaskChange={changeTask}
          saveTimerData={saveTimerData}
          workTime={state.workTime}
        />
      );
    } else {
      taskField = (
        <div className="nodata" style={nodataStyle}>
          No todos added yet
        </div>
      );
    }
    return taskField;
  };

  return (
    <section className="todoapp">
      <Header onTaskAdd={addNewTask} />
      <section className="main">
        {renderTaskfield()}
        <Footer
          countUnfinished={countUnfinished}
          changeFilterState={changeFilterState}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
};

ReactDOM.render(<TodoApp />, document.getElementById('appbody'));
