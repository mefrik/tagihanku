import { auth } from "./firebase-config";

// SignUp User
export function signup(username, password){
    return auth.createUserWithEmailAndPassword(username, password)
}

// SignIn User
export async function signin(username, password){
    return await auth.signInWithEmailAndPassword(username, password)
}

// SignOut User
export async function signout(){
    return await auth.signOut()
    .then(() => {
        localStorage.removeItem('userId');
        // Sign-out successful.
        console.log("LogOut Success")
    }).catch((error) => {
        alert(error.message)
        console.log(error.code)
        console.log(error.message)
    });
}