import React from "react";

function ProgressCard({tasks}) {
    const completed = tasks.filter(task => task.done).length
    const percent = Math.floor((completed / tasks.length) * 100)
    const left = tasks.length - completed

    return (
        <div className="bg-gray-100 border-4 border-gray-600 p-6 w-full text-center text-gray-700 rounded-3xl shadow-md shadow-gray-500">
            <h3 className="text-2xl font-semibold mb-4">Today's progress summary</h3>
            {tasks.length > 0 && <div className="border-2 border-gray-600 mx-auto my-2.5 w-[50%] bg-gray-300 rounded-full h-5">
                <div className="bg-gradient-to-r from-green-700 to-green-500 h-4 rounded-full transition-all duration-500" style={{width: percent + "%"}}></div>
            </div>}
            <p className="text-md font-semibold">
                {tasks.length > 0 ? left > 0 ? `You got ${left} tasks left!`
                    : `Congrats you finished your Tasks!`
                    : "You have not set any tasks yet for today"
                }
            </p>
        </div>
    )
}

export default ProgressCard