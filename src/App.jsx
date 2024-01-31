import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import Container from "./component/Container";
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./component/TodoForm";
import TodoItem from "./component/TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]); 
  };


  const editTodo = (id, todo) => {
      // const newTodo = todos.map((prevTodo)=> prevTodo.id=== id ? {...prevTodo, title:todo}: prevTodo);
      // console.log(newTodo);
      setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo,title:todo}: prevTodo));
  };

  const deleteTodo = (id) => {

    // const newTodos = todos.filter((todo)=> todo.id !== id);

    // setTodos(newTodos)
    setTodos((prev)=> prev.filter((el)=>el.id!==id))
  };

  const toggleComplete = (id) => {
  // const newTodos = todos.map((todo)=>todo.id === id ? {...todo, completed:!todo.completed}: (todo));
  // setTodos(newTodos)
  setTodos((prev)=> prev.map((todo)=> todo.id === id ? {...todo, completed:!todo.completed}: todo))
  };

  useEffect(()=>{

    const todos = JSON.parse(localStorage.getItem('todos'));
      if(todos && todos.length>0){
        setTodos(todos);
      }
    

  },[])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  

  return (
    <TodoProvider value={{todos, addTodo, editTodo, deleteTodo, toggleComplete }}>
      <div className="flex flex-col bg-gradient-to-tr from-purple-500 via-blue-500 to-purple-500 w-full h-screen overflow-y-scroll">
        <Header />
        <div className="flex justify-center items-center my-auto mt-10">
          <Container>
            <h2 className="text-center mb-5 text-2xl font-bold text-gray-100">
              Manage Your Todos
            </h2>
             <TodoForm />
            {
              todos?.map((ele)=>(
               <TodoItem key={ele.id} todo={ele}/>
              ))
            }
          </Container>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
