import { child, update, ref } from 'firebase/database'
import React, { useRef, useState } from 'react'
import { dbRealtime } from '../Auth/firebase-config'

function useUpadateValue(initialLoad = true) {
    const [isLoading, setIsLoading] = useState(initialLoad)
    const error = useRef(null)
    const success = useRef(null)


    //Update all doc
    const updateDoc = async (path, value) => {
        setIsLoading(true)
        try {
            const rootReference = ref(dbRealtime)
            const dbPath = child(rootReference, path)
            await update(dbPath, value)
            success.current = true
        } catch (updateError) {
            error.current = updateError.message
        }
        setIsLoading(false)
    }

    //Only who u choosen
    const updateField = async (path, updates) => {
        setIsLoading(true)
        try {
            const rootReference = ref(dbRealtime)
            const dbPath = child(rootReference, path)
            await update(dbPath, updates)
            success.current = true
        } catch (updateError) {
            error.current = updateError.message
        }
        setIsLoading(false)
    }    
    
    return {
        isLoading,
        error: error.current,
        success: success.current,
        updateDoc,
        updateField,
    }
}

export default useUpadateValue