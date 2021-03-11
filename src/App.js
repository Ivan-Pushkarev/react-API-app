import {useState, useEffect} from 'react';
import './App.css';
let idForSaveButton;

function App() {
  const [list, setList] = useState([{
    id: 1,
    title: 'First Item'
  }])
  const[inputValueTask, setInputValueTask]= useState('');
  const[editFormInputValueTask, setEditFormInputValueTask]= useState('');
  const[editFormInputValueBody, setEditFormInputValueBody]= useState('');
  
  const postGetAll = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => setList(json));
  };
  useEffect(() => {
    postGetAll()
  }, []);
  const addTask= () =>{
    console.log('addTask', inputValueTask);
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: inputValueTask,
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
        .then((response) => response.json())
        .then(() => { postGetAll() });
    
  }
  const deletePost = (id) =>{
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
  }
  const editPost = (id) => {
    idForSaveButton = id;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((json) => {
          setEditFormInputValueTask(json.title);
          setEditFormInputValueBody(json.body);
        });
  }
  
  const save = () => {
    console.log(idForSaveButton);
    fetch(`https://jsonplaceholder.typicode.com/posts/${idForSaveButton}`, {
      method: 'PUT',
      body: JSON.stringify({
        id:`${idForSaveButton}`,
        title: `${editFormInputValueTask}`,
        body: `${editFormInputValueBody}`,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
  
  }
 
  return (
      <div>
        <input type="text" value={inputValueTask} onChange={e => setInputValueTask(e.target.value)}/>
        <button onClick={addTask}>Add Task</button>
        
        <div>
          <div>
            <input type="text" value={editFormInputValueTask} onChange={e => setEditFormInputValueTask(e.target.value)}/>
          </div>
          <textarea name="" id="" cols="40" rows="10"
                    value={editFormInputValueBody}
                    onChange={e=> setEditFormInputValueBody(e.target.value)}> </textarea>
          <button onClick={save}>Save</button>
        </div>
        
        
        
        <ul>
          {list.map(el => <li key={el.id}>{el.title}
            <button onClick={() => deletePost(el.id)}>Delete</button>
            <button onClick={() => editPost(el.id)}>Edit</button>
          </li>)}
        </ul>
      </div>
  );
}

export default App;
