

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, collection, setDoc, deleteDoc, updateDoc, getDocsFromServer} from "firebase/firestore";
import { app } from "../services/firebase";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function useFirebase() {
    const db = getFirestore(app)
    const auth = getAuth(app);
    const {setUserId} = useContext(UserContext)

    function login(mail, password) {
        return signInWithEmailAndPassword(auth, mail, password)
            .then((userCredential) => setUserId(userCredential.user.uid))
    }

    function signup(mail, password) {
        return createUserWithEmailAndPassword(auth, mail, password)
            .then((userCredential) => setUserId(userCredential.user.uid))
    }

    function updateDocument(path, data) {
        return updateDoc(doc(db, path), data)
    }

    function deleteDocument(path) {
        return deleteDoc(doc(db, path))
    }

    function setDocument(path, data) {
        return setDoc(doc(db, path), data)
    }

    function getDocumentsFromServer(path) {
        return getDocsFromServer(collection(db, path))
    }

    return {login, signup, updateDocument, deleteDocument, setDocument, getDocumentsFromServer}
}

export default useFirebase