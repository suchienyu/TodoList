import React, { useState } from 'react';
const apiBaseURL = process.env.REACT_APP_API_URL;

function Todo({ text, todo, todos, setTodos }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const CompleteHandleChange=()=>{
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
        // 发送 DELETE 请求到后端
        fetch(`${apiBaseURL}/todos/${todo.id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
              // 如果需要认证或其他头部信息，请在此添加
          },
          // 可选：如果后端需要请求体，则添加请求体
          // body: JSON.stringify({}),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          // 如果請求成功，更新前端的 todos 狀態
          setTodos(todos.filter(task => task.id !== todo.id));
      })
      .catch(error => {
          console.error('Error deleting todo:', error);
          // 處理錯誤情況，例如顯示錯誤消息
      });
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
        // 發送patch請求到後端
        console.log('todo',todo);
        fetch(`${apiBaseURL}/todos/${todo.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: newText })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          // 更新前端的 todos 狀態
          setTodos(todos.map(item => {
              if (item.id === todo.id) {
                  return { ...item, text: newText };
              }
              return item;
          }));
          setIsEditing(false);
      })
      .catch(error => {
          console.error('Error updating todo:', error);
          // 處理錯誤情況，例如顯示錯誤消息
      });
      };
    
      if (!todo || !todo.text) {
        return null; // 或顯示某些佔位內容
    }
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
            <button className="check-btn" onClick={CompleteHandleChange}>
                <i className={`fas fa-check fa-xs ${todo.completed? "completed-checkbox" : ""}`}></i>
            </button>

            <li className={`todo-item ${todo.completed? "completed " : ""}`}>
              {todo.text}
            </li>
            
            <button className="trash-btn" onClick={deleteHandler}>
                <i className="fas fa-times fa-xs">Delete</i>
            </button>

            <button onClick={isEditing ? saveHandler : editHandler} className="edit-btn">
        {isEditing ? 'Save' : 'Edit'}
      </button>

        </div>
    );

}
export default Todo;