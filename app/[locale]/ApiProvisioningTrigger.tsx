'use client'

import {useEffect, useRef} from 'react'
import {triggerProvisioning} from '@/lib/api'

export function ApiProvisioningTrigger() {
    const hasTriggered = useRef(false)

    useEffect(() => {
        if (!hasTriggered.current) {
            triggerProvisioning().catch(console.error)
            hasTriggered.current = true
        }
    }, [])

    return null
}