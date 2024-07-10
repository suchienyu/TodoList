import React from "react"
import '../index.css';
const apiBaseURL = process.env.REACT_APP_API_URL;


function Form  ({inputText, setInputText, todos, setTodos, setStatus })  { 
    const Inputhandlechange=(event) =>{
       setInputText(event.target.value) 
    }

    const submitHandleChange = async (event) => {
        event.preventDefault();
        const newTodo = { text: inputText, completed: false };

        try {
            const response = await fetch(`${apiBaseURL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            });

            const data = await response.json();
            setTodos([...todos, data]); // 更新前端狀態
        } catch (error) {
            console.error('Error adding todo:', error);
        }
        //  setTodos([
        //      ...todos, 
        //      { text: inputText, completed: false}
        //  ])
        setInputText(""); // 清空輸入框
    };
        

        //setInputText("")
    

    function statusHandleChange(event){
        setStatus(event.target.value)
        console.log(event.target.value)
    }

    return(
        <form>
            <div className="input-option">
                <select name="todos" onChange={statusHandleChange} dir="rtl">
                    <option className="options" value="all">All</option>
                    <option className="options" value="completed">Completed</option>
                    <option className="options" value="uncompleted">Uncompleted </option>
                </select>   
            </div>

            <div className="input-text">
                <input className="text"
                    type="text"
                    placeholder="Add a task..."
                    value={inputText}
                    onChange={Inputhandlechange}
                />

                <button className="add-button"
                    type="submit" value="+"
                    onClick={submitHandleChange}
                >
                    
                </button>
            </div>
        </form>
    )
}

export default Form