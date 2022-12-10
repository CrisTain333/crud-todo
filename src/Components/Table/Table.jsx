import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import TableRow from "../TableRow/TableRow";

const Table = ({ toDos, refetch }) => {
    const [toDo, setTodo] = useState(null);
  return (
    <>
    <table className="table w-full">
      {/* <!-- head --> */}
      <thead>
        <tr>
          <th></th>
          <th>To Do</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* <!-- rows  --> */}
        {toDos.map((tasks) => (
          <TableRow key={tasks._id} setTodo={setTodo}  task={tasks} refetch={refetch} />
        ))}
      </tbody>
    </table>
    
        {toDo && <Modal tasks={toDo} setTodo={setTodo} refetch={refetch} />}

    
    </>
  );
};

export default Table;
