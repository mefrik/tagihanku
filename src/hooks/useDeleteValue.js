import { child, update, ref, remove } from 'firebase/database'
import React, { useRef, useState } from 'react'
import { dbRealtime, storage } from '../Auth/firebase-config'
import { ref as refStorage, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';

function useDeleteValue(initialLoad) {
    const [isLoading, setIsLoading] = useState(initialLoad)
    const error = useRef(null)
    const success = useRef(null)
    const info = useRef(null)


    //Delete Object Storage
    const deleteObj = async (path) => {
        info.current = 'Storage'
        try {
            const rootReference = refStorage(storage, path)
            deleteObject(rootReference)
            success.current = true
        } catch (updateError) {
            alert(updateError)
            error.current = updateError.message
        }
        setIsLoading(false)
    }


    //Delete Database
    const deleteDb = async (path, value) => {
        info.current = 'Database'
        try {
            const rootReference = ref(dbRealtime)
            const dbPath = child(rootReference, path)
            await remove(dbPath)
            success.current = true
        } catch (updateError) {
            alert(updateError)
            error.current = updateError.message
        }
        setIsLoading(false)
    }
    
    return {
        isLoading,
        error: error.current,
        success: success.current,
        deleteObj,
        deleteDb,
        info: info.current,
    }
}

export default useDeleteValue