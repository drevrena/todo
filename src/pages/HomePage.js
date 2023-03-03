import React, { useEffect, useContext, useState } from "react";
import ProgressCard from "../components/ProgressCard";
import { getDocsFromServer, getFirestore, collection, updateDoc, doc, deleteDoc, setDoc} from "firebase/firestore";
import { Task } from "../components/Task";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth  } from "firebase/auth";
import { app } from "../firebase";
import { UserContext } from "../context/UserContext";
import timeStringSorter from "../utils/timeStringSorter";
import TaskInput from "../components/TaskInput";

function HomePage() {
    const db = getFirestore(app)
    const auth = getAuth(app);
    const navigate = useNavigate()
    const {userId, setUserId} = useContext(UserContext)
    const [tasks, setTasks] = useState([])

    function updateTask(taskId, data) {
        updateDoc(doc(db, "users", userId, "tasks", taskId), data)
        setTasks(prev => {
            let toUpdateIndex = prev.findIndex(task=> task.id === taskId)
            //replace old object with new object and new data
            prev.splice(toUpdateIndex, 1, { ...prev[toUpdateIndex], ...data })
            return [...prev]
        })
    }

    function removeTask(taskId) {
        deleteDoc(doc(db, "users", userId, "tasks", taskId))
        setTasks(prev => {
            prev.splice(prev.findIndex(task=> task.id === taskId), 1)
            return [...prev]
        })
    }

    function addTask(task) {
        setDoc(doc(db, "users", userId, "tasks", task.id), task)
        setTasks(prev => {
            return [...prev, task]
        })
    }

    useEffect(()=> {
        if(!userId){
            return navigate("/")
        }

        getDocsFromServer(collection(db, "users", userId, "tasks")).then(querySnap => {
            let fetchedTasks = []
            querySnap.forEach(docSnap => {
                fetchedTasks.push({ key: docSnap.id, ...docSnap.data()})
            })
            return fetchedTasks
        }).then((fetchedTasks) => setTasks(fetchedTasks))

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid)
            } else {
                setUserId(null)
                return navigate("/")
            }
          });
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