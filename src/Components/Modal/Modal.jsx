import React from "react";

const Modal = ({ tasks, setTodo, refetch }) => {
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedToDo = form.toDo.value;
    // const updatedData = {
    //   updatedToDo,
    // };
    fetch(` https://to-do-server-rosy.vercel.app/api/v1/toDos/${tasks._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedToDo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setTodo(null);
          refetch();
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Update ToDo</h3>
          <form onSubmit={handleUpdate}>
            <textarea
              defaultValue={tasks?.toDo}
              className="textarea textarea-bordered mt-5"
              cols="60"
              name="toDo"
            ></textarea>
            <div className="modal-action flex items-center justify-center">
              <button className="btn" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
