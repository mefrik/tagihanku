import 
    React, { 
        useState, 
        useEffect, 
        useRef 
} from 'react'
import { 
    getDownloadURL, 
    ref, 
    uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../Auth/firebase-config';

const usePushUpload = (path, dataImage, initialLoad) => {
    const [isLoading, setIsLoading] = useState(initialLoad)
    const [progress, setProgress] = useState(0);
    const error = useRef(null)
    const success = useRef(null)
    const urlPhoto = useRef(null)

    const pushUpload = async () => {
        await new Promise(resolve => {
            const storageRef = ref(storage, path);
            const uploadTask = uploadBytesResumable(storageRef, dataImage);
    
            uploadTask.on('state_changed', (snapshot) =>{
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog)
                    if(prog ===  100){
                        success.current = true
                    }
                },
                (err) => error.current = err.message,
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        urlPhoto.current = url
                        console.log('selesai')
                        setTimeout(() => {
                            setIsLoading(false)
                            resolve("Upload Selesai")
                        }, 2000);
                    })
                }
            )
        })
    }

    const getProcessUpload = () => {
        urlPhoto.current = null
        error.current = null
        setIsLoading(true)
    }

    useEffect(() => {
        if(isLoading){
            pushUpload()
        }
    }, [isLoading])
    

    return {
        getProcessUpload,
        pushUpload,
        isLoading,
        error: error.current,
        success: success.current,
        progress,
        urlPhoto: urlPhoto.current,
    }
}

export default usePushUpload