import React, {useState, useEffect} from 'react'
// import Upload from './upload'

const API = 'http://taskmaster-env.p2inzhbxb8.us-east-1.elasticbeanstalk.com/tasks'

function Tasks() {
  const [tasks, setTasks] = useState([])

  const getTasks = () => {
    fetch(API, {mode:'cors'})
    .then(data => data.json())
    .then(json => setTasks(json))
    .catch(console.error);
   }

  useEffect(getTasks, [])
  return (

    <div>
      <ul>
        <li>
      <section className="section-spans">
        <span className="header-span">Title</span>
        <span className="header-span">Description</span>
        <span className="header-span">Assignee</span>
        <span className="header-span">Status</span>
         <span className="header-span">Upload image</span>
      </section>
      </li>
      </ul>
    <ul>
        {tasks.map((task) => 
    <li key={task.id}>
      <div>
        <span>{task.title}</span>
        <span>{task.description}</span>
        <span>{task.assignee}</span>
        <span>{task.status}</span>
        {/* <Upload id={task.id}></Upload> */}
        </div>
      </li>
    )}
    </ul>
    </div>

  )
}

export default Tasks;