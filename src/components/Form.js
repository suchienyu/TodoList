import React from "react"
import '../index.css';

const Form = ({inputText, setInputText, todos, setTodos, setStatus }) => { 
    function Inputhandlechange(event) {
       setInputText(event.target.value) 
    }

    function submitHandleChange(event) {
        event.preventDefault()
        setTodos([
            ...todos, 
            { text: inputText, completed: false, id: Math.floor(Math.random() * 3000)}
        ])

        setInputText("")
    }

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