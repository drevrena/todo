import React, { useEffect, useContext, useState } from "react";
import ProgressCard from "../components/ProgressCard";
import Task from "../components/Task";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import timeStringSorter from "../utils/timeStringSorter";
import TaskInput from "../components/TaskInput";
import useTasks from "../hooks/useTasks";

function HomePage() {
    const {tasks, loadTasks, updateTask, removeTask, addTask} = useTasks()
    const {userId} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=> {
        userId ? loadTasks() : navigate("/")
    }, [userId])
    
    if(!userId){
        return
    }

    const tasksElement = tasks.map(task => <Task key={task.id} {...task} updateTask={updateTask} deleteTask={removeTask}/>)
    tasksElement.sort(timeStringSorter)

    return(
        <div className="bg-gradient-to-br from-cyan-400 to-blue-700 w-full h-full min-h-screen min-w-screen">
            <div className="flex flex-col items-center mx-[10%] lg:mx-auto py-12 max-w-[720px]">
                <ProgressCard tasks={tasks}/>
                <h1 className="my-8 text-3xl font-semibold border-b-4 w-full pb-4 text-gray-200">Today's Task</h1>
                {tasksElement}
                <TaskInput addTask={addTask}/>
            </div>
        </div>
    )
}

export default HomePage