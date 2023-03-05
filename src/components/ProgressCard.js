import React from "react";

function ProgressCard({tasks}) {
    const completed = tasks.filter(task => task.done).length
    const percent = Math.floor((completed / tasks.length) * 100)
    const left = tasks.length - completed

    return (
        <div className="bg-transparent p-6 w-full text-center text-gray-700 mb-8 border-b-2">
            <h1 className="mb-8 text-3xl font-semibold w-full text-gray-100">Today's Task</h1>
            {tasks.length > 0 && <div className="relative border-2 border-gray-600 mx-auto my-2.5 w-[80%] max-w-sm bg-gray-300 rounded-full h-7">
                <span className="absolute left-0 w-full text-md text-gray-700 font-semibold">({percent}%)</span>
                <div className="bg-gradient-to-r from-green-700 to-green-500 h-6  rounded-full transition-all duration-500" style={{width: percent + "%"}}>
                </div>
            </div>}
        </div>
    )
}

export default ProgressCard