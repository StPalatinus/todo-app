import React from 'react';
import ReactDOM from 'react-dom'
import Header from './header';
import TaskList  from './task-list';
import Footer from './footer';

const TodoApp = () => {

  const tasksData = [
    {
      description: 'Completed task',
      created: 'created 17 seconds ago',
      showField: false,
    },
    {
      description: 'Editing task',
      created: 'created 5 seconds ago',
      showField: true,
    },
    {
      description: 'Active task',
      created: 'created 5 seconds ago',
      showField: false,
    },
    {
      description: 'Test task',
      created: 'pending',
      showField: false,
    }
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