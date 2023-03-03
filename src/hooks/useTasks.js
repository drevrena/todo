import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext";
import useFirebase from "./useFirebase";

function useTasks() {
    const {userId} = useContext(UserContext)
    const [tasks, setTasks] = useState([])
    const {updateDocument, deleteDocument, setDocument, getDocumentsFromServer} = useFirebase()

    function loadTasks() {
        getDocumentsFromServer(`users/${userId}/tasks`)
            .then(querySnap => {
                let fetchedTasks = []
                querySnap.forEach(docSnap => {
                    fetchedTasks.push({ key: docSnap.id, ...docSnap.data()})
                })
                return fetchedTasks
            })
            .then(fetched => setTasks(fetched))
    }

    function updateTask(taskId, data) {
        updateDocument(`users/${userId}/tasks/${taskId}`, data)
        setTasks(prev => {
            let toUpdateIndex = prev.findIndex(task=> task.id === taskId)
            //replace old object with new object and new data
            prev.splice(toUpdateIndex, 1, { ...prev[toUpdateIndex], ...data })
            return [...prev]
        })
    }

    function removeTask(taskId) {
        deleteDocument(`users/${userId}/tasks/${taskId}`)
        setTasks(prev => {
            prev.splice(prev.findIndex(task=> task.id === taskId), 1)
            return [...prev]
        })
    }

    function addTask(task) {
        setDocument(`users/${userId}/tasks/${task.id}`, task)
        setTasks(prev => {
            return [...prev, task]
        })
    }
    return {tasks, loadTasks, updateTask, removeTask, addTask}
}

export default useTasks