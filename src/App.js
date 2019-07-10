import React from 'react';
import './App.css';
import Tasks from './components/task'
import './style/app.scss';

function App() {
  return (
    <div className="pp">
      <header>Task Manager</header>
      <main>
        <Tasks></Tasks>
      </main>
    </div>
  );
}

export default App;
