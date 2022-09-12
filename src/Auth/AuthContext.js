import { auth } from "./firebase-config";

// SignUp User
export function signup(username, password){
    return auth.createUserWithEmailAndPassword(username, password)
    // .then((userCredential) => {
    //     // Signed in 
    //     console.log(userCredential.user)
    //     // ...
    // })
    // .catch((error) => {
    //     alert(error.message)
    //     console.log(error.code)
    //     console.log(error.message)
    //     // ..
    // });
}

// SignIn User
export async function signin(username, password){
    // console.log(username)
    // console.log(password)
    // console.log(auth)
    return await auth.signInWithEmailAndPassword(username, password).then(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // const uid = user.uid;
            // ...
            } else {
            // User is signed out
            // ...
            }
        });
    })
}

// SignOut User
export async function signout(){
    return await auth.signOut()
    .then(() => {
        // Sign-out successful.
        console.log("LogOut Success")
    }).catch((error) => {
        alert(error.message)
        console.log(error.code)
        console.log(error.message)
    });
}

// GetUser SignIn
export async function getuser(){
    return auth.onAuthStateChanged((user) => {
        // const [name, setName] = useState('');
        // const [photo, setPhoto] = useState('');
        // const [nohp, setNohp] = useState('');
        // const [email, setEmail] = useState('');
        // const [verified, setVerified] = useState('');
        // const uid = user.uid;
        
        // if (user !== null) {
        //     setName(user.displayName);
        //     setPhoto(user.photoURL);
        //     setNohp(user.phoneNumber);
        //     setEmail(user.email);
        //     setVerified(user.emailVerified);
        // } else {
        //     // User is signed out
        //     // ...
        // }
    })
}