import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";
import Modal from "../Modal/Modal";
const TableRow = ({ task, refetch, setTodo }) => {
  //handle Delete
  const handleDelete = (id) => {
    fetch(` https://to-do-server-rosy.vercel.app/api/v1/toDos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };

  const handleComplete = (id) => {
    fetch(` https://to-do-server-rosy.vercel.app/api/v1/toDos/complete/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };

  return (
    <>
      <tr>
        <th>
          {task.isCompleted ? (
            <button className="btn hover:bg-green-600 cursor-text bg-green-500 text-white  ">
              Completed <MdDownloadDone></MdDownloadDone>{" "}
            </button>
          ) : (
            <button className="btn " onClick={() => handleComplete(task._id)}>
              Complete
            </button>
          )}
        </th>
        <td
          className={
            task.isCompleted
              ? "text-lg font-semibold line-through"
              : "text-lg font-semibold"
          }
        >
          {task.toDo}
        </td>
        <td className="flex justify-between items-center w-40">
          {" "}
          <label
            htmlFor="my-modal"
            className="btn btn-circle btn-outline"
            onClick={() => setTodo(task)}
          >
            <AiFillEdit className="text-2xl "></AiFillEdit>
          </label>
          <span>
            <button
              className="btn btn-circle btn-outline"
              onClick={() => handleDelete(task._id)}
            >
              <AiFillDelete className="text-2xl text-red-500"></AiFillDelete>
            </button>
          </span>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
