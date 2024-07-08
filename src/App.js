import React, { useState, useEffect } from "react";
import './index.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { getTodos } from "./services/service";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [message, setMessage] = useState('');
  
  //   useEffect(() => {
  //      fetch('http://localhost:5001/api/todos')
  //          .then(response => response.json())
  //          .then(data => setMessage(data.message))
  //          .catch(error => console.error('Error:', error));
  //  }, []);
  
  

  useEffect(() => {
    // 獲取 todos 數據
    fetch('http://localhost:5001/api/todos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
          const activeTodos = data.filter(todo => !todo.deleted);
          setTodos(activeTodos);
          setFilteredTodos(activeTodos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}, []); // [] 只在組件掛載時執行一次



useEffect(() =>{
  function filterHandlerChange() {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  filterHandlerChange();
},[todos,status]);
  

  return (
     <div className="App">
      <header>
         <h1>Todo List</h1>
      </header>

      <Form
               inputText={inputText}
             setInputText={setInputText}
               todos={todos}
               setTodos={setTodos}
               setStatus={setStatus}   />

             <TodoList
               todos={todos}
               setTodos={setTodos}
               filteredTodos={filteredTodos}/> 

       {/* <Form
    //     inputText={inputText}
    //     setInputText={setInputText}
    //     todos={todos}
    //     setTodos={setTodos}
    //     setStatus={setStatus}
    //   />

    //   <TodoList
    //     todos={todos}
    //     setTodos={setTodos}
    //     filteredTodos={filteredTodos}
    //   /> */}
     </div>
    );

}

export default App;
