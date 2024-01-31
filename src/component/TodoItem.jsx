import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaSave } from "react-icons/fa";

const TodoItem = ( {todo} ) => {
    if(!todo || !todo.title) return ;
  const { editTodo, deleteTodo, toggleComplete } = useTodo();
  const [todoMsg,setTodoMsg] = useState(todo.title);
  const [isEditable, setIsEditable] = useState(false);

  const edit =()=>{
    editTodo(todo.id,todoMsg);
    setIsEditable(!isEditable)
  }
  const del = () =>{

    deleteTodo(todo.id);
  }

  const toggle = ()=>{

    toggleComplete(todo.id);
  }

  return (
    <div className={`w-full bg-gray-100 border-2 rounded-md 
        border-gray-400 outline-none mb-1 flex px-2 py-2
        ${todo.completed ? (" bg-green-400 line-through"):{}} 
        items-center text-xl justify-between`}>
      <div className="flex gap-2 w-[85%]">
        <input type="checkbox" 
            checked = {todo.completed}
            onChange={toggle}
        />
         <input
            type="text"
            className={` outline-none bg-transparent w-full ${isEditable ? (" border-2 border-gray-500 rounded-md px-2 py-1"): ("")} `}
            value={todoMsg}
            onChange={(e)=>{setTodoMsg(e.target.value)}}
            readOnly={!isEditable}
        /> 
      </div>
      <div className="flex items-center gap-2">
        <button
          className=" bg-yellow-400 rounded-md px-1 py-1 hover:bg-yellow-600 "
          onClick={()=>{
            if(isEditable) edit();
            else setIsEditable(!isEditable)
          }}
        >
          {!isEditable ? <MdEdit className=" text-2xl"/> : <FaSave className="text-2xl"/>}
        </button>
        <button
         className=" bg-yellow-400 rounded-md px-1 py-1 hover:bg-yellow-600"
        >
          <AiFillDelete className="text-2xl" onClick={del}/>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
