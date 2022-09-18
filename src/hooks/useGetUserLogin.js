import 
    React, { 
        useState, 
        useEffect, 
        useRef 
} from 'react'
import { 
    auth, 
    dbRealtime
} from '../Auth/firebase-config'
import { 
    child, 
    get, 
    ref
} from 'firebase/database'

function useGetUserLogin(initialLoad = true) {
    const [isLoading, setIsLoading] = useState(initialLoad)
    const error = useRef(null)
    const success = useRef(null)
    const name = useRef(null)
    const phoneNumber = useRef(null)
    const email = useRef(null)
    const verified = useRef(null)
    const photo = useRef(null)
    const uid = useRef(null)
    const refreshToken = useRef(null)
    const userStatus = useRef(null)
    const userActive = useRef(null)
    const createdAt = useRef(null)
    const updateAt = useRef(null)
    
    
    const getUserLogin = () => {
      setIsLoading(true)
      try {
        auth.onAuthStateChanged( async (user) =>{
          const rootReference = ref(dbRealtime)
          const dbPath = child(rootReference, `users/${user.uid}`)
          await get(dbPath).then((snapshot) => {
            if (snapshot.exists()) {
                name.current = snapshot.val().name
                phoneNumber.current = snapshot.val().phoneNumber
                email.current = snapshot.val().email
                verified.current = snapshot.val().emailVerified
                photo.current = snapshot.val().photoURL
                uid.current = snapshot.val().uid
                refreshToken.current = snapshot.val().refreshToken
                userStatus.current = snapshot.val().userStatus
                userActive.current = snapshot.val().isActive
                success.current = true
                createdAt.current = snapshot.val().createdAt
                updateAt.current = snapshot.val().updateAt
            }
          }).catch((getError) => {
            error.current = getError.message
          })
            setIsLoading(false)
        })
      } catch (getError) {
          error.current = getError.message
      }
    }

    const getProcessUser = () => setIsLoading(true)

    useEffect(() => {
      if(isLoading){
        getUserLogin()
      }
    }, [isLoading])
    

  return {
    getProcessUser,
    isLoading,
    success: success.current,
    name: name.current,
    phoneNumber: phoneNumber.current,
    email: email.current,
    verified: verified.current,
    photo: photo.current,
    uid: uid.current,
    refreshToken: refreshToken.current,
    userStatus: userStatus.current,
    userActive: userActive.current,
    createdAt: createdAt.current,
    updateAt: updateAt.current,
  }
}

export default useGetUserLogin