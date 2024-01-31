import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTodo } from "../context/TodoContext";
const TodoForm = () => {
  const { addTodo } = useTodo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitTodo = (data) => {
    if (!data) return;
    addTodo({ ...data, completed: false });
    reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitTodo)}
        className=" w-full  flex flex-col mb-3 "
      >
        <div className="flex bg-gray-200 w-full rounded-md pl-4 mx-auto">
          <input
            className={`outline-none bg-transparent w-full `} 
            placeholder="Write Todo..."
            {...register("title", { required: true })}
          />

          <input
            type="submit"
            value="Add"
            className=" bg-yellow-400 px-4 py-2 hover:bg-yellow-600 outline-none  rounded-md text-xl font-bold"
          />
        </div>
        {errors.todo && (
          <span className="pl-4 text-white font-bold">
            This Field is required
          </span>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
