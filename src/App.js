import React,{useState,useEffect} from 'react';
import './App.css';

function Todo({todo, index,complete,remove}){

return (<div  className='todo' style={{background: todo.isCompleted ? "rgb(5, 226, 152)" : "" }}>
  {todo.text}
  <div>
  <button style={{display: todo.isCompleted ? "none" : "" }} className='complete'  onClick={()=>complete(index)}>&#x2714;</button>
  <button className='remove'onClick={()=>remove(index)}>&#10008;</button>
  </div>
</div>
);
}


function FormTodo({addtodo}){
  const [value,setValue]=useState('');
  const handleSubmit= (e)=>{
  e.preventDefault();
  if(!value) return;
  addtodo(value);
  setValue('');
};
  return(

    <form onSubmit={handleSubmit}>
      <input type="text" className='input' value={value} placeholder='Add NewTodo...' onChange={e=>setValue(e.target.value)}/>
    </form>
  );
}




function App() {

  const[todos,setTodos]=useState([]);

  //only runs once the first time this component is rendered
  useEffect(()=>{
   if(localStorage.getItem("todo-lists")) {
    setTodos(JSON.parse(localStorage.getItem("todo-lists")))
   }
  },[])

  //runs everytime state changes
  useEffect(()=>{
    localStorage.setItem("todo-lists",JSON.stringify(todos))
  },[todos])

  const addtodo =text=>{
    const  newtodo=[...todos, {text}];
    setTodos(newtodo);    
    }

    const complete=index=>{
      const newtodo=[...todos];
      newtodo[index].isCompleted=true;
      setTodos(newtodo);
    } 
    
    const remove=index=>{
      const newtodo=[...todos];
      newtodo.splice(index,1);
      setTodos(newtodo);
    } 


  return (
    <div className="App">
     <div className="todo-list">
       <div className="title">ToDo List</div>
      {todos.map((todo,index)=>(
      <Todo key={index} index={index} todo={todo} complete={complete} remove={remove} />
      ))}
  <FormTodo addtodo={addtodo}/>
     </div>
   
    </div>

  );
}

export default App;
