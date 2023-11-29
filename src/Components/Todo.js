import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [todo,setTodo]=useState('')
    const [todos,setTodos]=useState(null)

    useEffect(()=>{
        const storedTodos=localStorage.getItem('todos');
        if(storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }
        else{
            setTodos([])
        }
    },[])

    useEffect(()=>{
        if(todos!==null){
            localStorage.setItem('todos',JSON.stringify(todos));
        }
    },[todos])

    const handleSubmit=(e)=>{
        e.preventDefault();
        setTodos([...todos,todo])
        setTodo('')
    }
    const handleDelete=(index)=>{
        setTodos(todos.filter((val,ind)=>ind!=index))
    }

    if(todos===null){
       return  <p>Loading...</p>
    }

  return (
    <>
      <div className='todo-div'>
        <h1>To-do List</h1>
        <div className='form-div'>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input className='inp' type='text'required placeholder='Enter Something to add' value={todo} onChange={(e)=>setTodo(e.target.value)}></input>
            <button className='btn' type='submit' >Add Todo</button>
        </form>
        </div>
        <div className='ul-div'>
        <ul>
            {
                todos.map((todo,idx)=>{
                    return(
                        <div className='li-div' key={idx}>
                            <li >{todo} <button className='del-btn' onClick={()=>handleDelete(idx)}>Delete</button></li>
                        </div>
                    )
                })
            }
        </ul>
        </div>
      </div>
    </>
  )
}

export default Todo
