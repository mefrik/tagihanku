import { child, push, ref, set } from 'firebase/database'
import React, { useRef, useState } from 'react'
import { dbRealtime } from '../Auth/firebase-config'

function useCreateValue(initialLoad = true) {
    const [isLoading, setIsLoading] = useState(initialLoad)
    const error = useRef(null)
    const success = useRef(null)
    const data = useRef(null)


    //Automatic generete Key
    const pushValue = async (path, value) => {
        setIsLoading(true)
        try {
            const rootReference = ref(dbRealtime)
            const dbPath = child(rootReference, path)
            const dbPush = await push(dbPath, value)
            data.current = { key: dbPush.key, value }
            success.current = true
        } catch (pushError) {
            error.current = pushError.message
        }
        setIsLoading(false)
    }

    //No generete Key
    const setValue = async (path, value) => {
        setIsLoading(true)
        try {
            const rootReference = ref(dbRealtime)
            const dbPath = child(rootReference, path)
            const dbPush = await set(dbPath, value)
            data.current = { key: dbPush.key, value }
            success.current = true
        } catch (pushError) {
            error.current = pushError.message
        }
        setIsLoading(false)
    }    
    
    return {
        isLoading,
        error: error.current,
        success: success.current,
        data: data.current,
        pushValue,
        setValue,
    }
}

export default useCreateValue