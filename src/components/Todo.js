import React, { useState } from 'react';

function Todo({ text, todo, todos, setTodos }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);
    function deleteHandleChange(){
        setTodos(todos.filter((el) => el.id !== todo.id))
    }

    function CompleteHandleChange(){
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, completed: !item.completed
                }
            }
            return item
        })
        )
     }

    const deleteHandler = () =>{
        setTodos(todos.filter(task => task.id !== todo.id));
    };

    const completeHandler = () => {
        setTodos(todos.map(task => {
          if (task.id === todo.id) {
            return {
              ...task,
              completed: !task.completed
            };
          }
          return task;
        }));
      };
      
    const editHandler =()=>{
        setIsEditing(!isEditing);
    };

    const saveHandler = () => {
        setTodos(todos.map(item => {
          if (item.id === todo.id) {
            return { ...item, text: newText };
          }
          return item;
        }));
        setIsEditing(false);
      };
    
    return(
      
    <div className="todo">
        {
            isEditing && (
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
              ) 
        }
        {/* {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          
        </li>
      )} */}
            <button className="check-btn" onClick={CompleteHandleChange}>
                <i className={`fas fa-check fa-xs ${todo.completed? "completed-checkbox" : ""}`}></i>
            </button>

            <li className={`todo-item ${todo.completed? "completed " : ""}`}>{text}</li>
            
            <button className="trash-btn" onClick={deleteHandler}>
                <button className="fas fa-times fa-xs">Delete</button>
            </button>

            <button onClick={isEditing ? saveHandler : editHandler} className="edit-btn">
        {isEditing ? 'Save' : 'Edit'}
      </button>

        </div>
    );

}
export default Todo;