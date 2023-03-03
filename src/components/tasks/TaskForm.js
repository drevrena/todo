import React, { useState } from "react";
import { nanoid } from "nanoid";

function TaskInput({addTask}) {
    const [title, setTitle] = useState("")
    const [time, setTime] = useState("")

    function handleSubmit(event) {
        event.preventDefault()

        addTask({
            id: nanoid(), 
            title: title, 
            time: time, 
            done: false,
        })
        setTitle("")
        setTime("")
    }

    return (
        <>
            <form id="task-form" className="flex justify-between my-2 p-4 w-full bg-white rounded-lg shadow-md shadow-gray-400" onSubmit={handleSubmit}>
                <input
                    className=" outline-none w-[80%]"
                    type="text"
                    value={title}
                    required
                    placeholder="Task name"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <input
                    type="time"
                    value={time}
                    required
                    onChange={(event) => setTime(event.target.value)}
                />
            </form>
            <button className="px-4 py-2 mb-4 bg-transparent rounded-xl text-lg font-bold text-gray-100 border-gray-100 border-4 drop-shadow-lg mt-8" form="task-form">Add Task</button>
        </>
    )
}

export default TaskInput