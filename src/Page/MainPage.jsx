import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Table from "../Components/Table/Table";
import "./mainpage.css";

const MainPage = () => {
  const [error, setError] = useState("");

  //Get all ToDos
  const getTodo = async () => {
    const res = await fetch(" https://to-do-server-rosy.vercel.app/api/v1/toDos");
    const data = res.json();
    return data;
  };

  const { data: toDos = [], refetch } = useQuery({
    queryKey: ["toDos"],
    queryFn: getTodo,
  });

  //Handle Post
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const toDo = form.task.value;
    if (toDo === " ") {
      setError("Write Something To add");
      return;
    }
    setError('')

    const task = {
      toDo,
      isCompleted: false,
    };

    fetch(" https://to-do-server-rosy.vercel.app/api/v1/toDos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch();
        }
      });
    form.reset();
  };

  return (
    <div>
      <div id="myDIV" className="header">
        <h2 className="text-2xl mb-2">My To Do List</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="text-black"
            name="task"
            placeholder="Task..."
            required
          />
          <button className="addBtn" type="submit">
            Add
          </button>
        </form>
        <p className="text-white">{error}</p>
      </div>

      <div className="overflow-x-auto">
        <Table toDos={toDos} refetch={refetch}></Table>
      </div>
    </div>
  );
};

export default MainPage;
