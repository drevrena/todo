import { nanoid } from "nanoid";
import React, { useState } from "react";

function TaskInput({addTask}) {
    const [title, setTitle] = useState("")
    const [time, setTime] = useState("")

    return (
        <>
            <div className="flex justify-between my-2 p-4 w-full bg-white rounded-lg shadow-md shadow-gray-400">
                <input
                    className=" outline-none w-[80%]"
                    type="text"
                    value={title}
                    placeholder="Task name"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <input
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                />
            </div>
            <button 
                className="px-4 py-2 mb-4 bg-transparent rounded-xl text-lg font-bold text-gray-100 border-gray-100 border-4 drop-shadow-lg mt-8"
                onClick={() => {
                    if(title === "" || time === "")
                        return
                    addTask({id: nanoid(), title: title, time: time, done: false,})
                    setTitle("")
                    setTime("")
                }}
            >
            Add Task
            </button>
        </>
    )
}

export default TaskInput