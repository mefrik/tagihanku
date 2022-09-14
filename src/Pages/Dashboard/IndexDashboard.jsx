import React from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../Auth/firebase-config';
import Drawer from './Drawer'

export default function IndexDashboard() {
  const [name, setName] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [verified, setVerified] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [userId,  setUserId] = React.useState("");


  const handleGetUser = () => {
    //getUser
    auth.onAuthStateChanged(async (user) =>{
      if (user !== null) {
        const q = query(collection(db, "account"), where("name", "==", user.displayName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setPhoneNumber(doc.data().phoneNumber)
          setRole(doc.data().role)
          setUserId(doc.id)
        });
        setName(user.displayName);
        setPhoto(user.photoURL);
        setEmail(user.email);
        setVerified(user.emailVerified);

      }else {
      // User is signed out
      // ...
      }
    })
  }

  React.useEffect(() => {
    handleGetUser()
    localStorage.setItem('userId', JSON.stringify(userId));
  }, [userId]);

  return (
    <>
      <Drawer
        email={email}
        name={name}
        phoneNumber={phoneNumber}
        photo={photo}
        verified={verified}
        role={role}
        userId={userId}
      />
    </>
  )
}
