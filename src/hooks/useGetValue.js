import React, { useState, useEffect, useRef } from 'react'
import { 
    getDatabase, 
    ref, 
    query, 
    orderByChild, 
    get, 
    hild, 
    limitToLast, 
    orderByValue, 
    orderByKey, 
    child
} from "firebase/database";
import { dbRealtime } from '../Auth/firebase-config';

function useGetValue(path, initialLoad = true) {
    const [isLoading, setIsLoading] = useState(initialLoad)
    const error = useRef(null)
    const success = useRef(null)
    const snapshot = useRef(null)
    const isEmpty = useRef(false)
    const info = useRef(null)

    const getValue = async () => {
        try {
            const userName = JSON.parse(localStorage.getItem('userId'));
            const rootReference = ref(dbRealtime)
            const fullPath = `${path}/${userName}`
            const dbPath = child(rootReference, fullPath)
            const dbGet = await get(dbPath)
            const dbExist = dbGet.exists()
            if (!dbExist) {
                isEmpty.current = true
                info.current = 'No Data Available'
            }
            const dbValue = (((Object.keys(dbGet.val()).map((key, index) => ({
                ...dbGet.val()[key], number: index + 1, key: key
            })))))
            snapshot.current = dbValue
            success.current = true
        } catch (getError) {
            error.current = getError.message
        }
        setIsLoading(false)
    } 

    const processValue = () => {
        snapshot.current = null
        error.current = null
        setIsLoading(true)
      }

    useEffect(() => {
        if (isLoading) {
            getValue()
        }
    }, [isLoading])

    return {
        getValue,
        processValue,
        isLoading,
        error: error.current,
        success: success.current,
        snapshot: snapshot.current,
        isEmpty: isEmpty.current, 
        info: info.current,
    }
}   

export default useGetValue