import React, {useState, useEffect} from 'react'
import '../style/app.scss';

const API = 'http://taskmaster-env.p2inzhbxb8.us-east-1.elasticbeanstalk.com/tasks'

function Tasks() {

  // helper function
  const _toggleStatus = (e) => {
    e.preventDefault();
    let id = e.target.id;

    fetch( `${API}/${id}/state`, {
      mode:'cors',
      method: 'PUT'
    
    })
    .then(data => data.json())
    .then(task => {
      setTasks( Tasks.map( (entry) => {
          return entry.id === id ? task : entry;
        }
      ));
    })
    .catch( console.error );
  };

  function Description(props) {
    let description = props.task.description || [];
    let image = props.task.pic || [];
    let assignee = props.task.assignee || [];
    return (
      <section>
        Assignee Name: <span className="userdata">{assignee}</span>
        <br></br>
        Description: <span className="userdata">{description}</span>
        <br></br>
        Uploaded Image: <br></br>
        <img src={image} alt={image} />
      </section>
    )
  }


  const [Tasks, setTasks] = useState([])

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
        {Tasks.map((task) => 
    <li key={task.id}>
      <div>
        <span>Title: <span className="userdata">{task.title}</span></span>
        <Description task={task}></Description>
        <span>Status: 
          <button className={`button status-${task.status}`} id={task.id} onClick={_toggleStatus}>{task.status}</button>
        </span>
        <form className="push" action={`${API}/${task.id}/images`} method="post" encType="multipart/form-data">
              <label>
                <span>Upload Image: </span>
                <input name="file" type="file" />
              </label>
              <button>Submit</button>
              </form>
        </div>
      </li>
    )}
    </ul>
    </div>

  )

  
}




export default Tasks;