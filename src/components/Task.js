import React from "react";

function Task({id, title, time, done, updateTask, deleteTask}) {

    return(
        <div className="flex my-2 p-4 w-full bg-white rounded-lg shadow-md shadow-gray-400">
            <input
                className="w-6 h-6 my-auto"
                type="checkbox"
                checked={done}
                onChange={(event) => updateTask(id, {done: event.target.checked})}
            />
            <div className="mx-4">
                <h2 className="font-semibold text-lg">{title}</h2>
                <p className="text-sm text-gray-500">{time}</p>
            </div>
            <img 
                className="ml-auto my-auto w-6 h-6" 
                src="./assets/images/delete.png" 
                alt="Delete task icon"
                onClick={() => deleteTask(id)}
            />
        </div>
    )
}

export default Task