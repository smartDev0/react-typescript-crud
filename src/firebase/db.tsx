import { db, firestore } from "./firebase";

// User API
export const doCreateUser = (id: string, username: string, email: string) =>
    firestore.collection('users').add({
        id: id,
        username: username,
        email:email
    })
    // db.ref(`users/${id}`).set({
    //     email,
    //     username
    // });

export const onceGetUsers = () => db.ref("users").once("value");
