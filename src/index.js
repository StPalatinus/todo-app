import React from 'react';
import ReactDOM from 'react-dom'
import Header from './components/header';
import TaskList  from './components/task-list';
import Footer from './components/footer';
import './index.css';

const TodoApp = () => {

  let date = new Date() - 1020000;
  let date2 = new Date() - 300000;
  let date3 = new Date() - 300000;
  // (date - 500) - Date.now()

  const tasksData = [
    {
      description: 'Completed task',
      created: date,
      showField: false,
    },
    {
      description: 'Editing task',
      created: date2,
      showField: true,
    },
    {
      description: 'Active task',
      created: date3,
      showField: false,
    },
  ];

  return (
    <section className="todoapp">
        <Header />
      <section className="main">
        <TaskList tasksList ={tasksData} />
        <Footer />
      </section>
    </section>
  );
};

ReactDOM.render(<TodoApp />,
  document.getElementById('appbody'));