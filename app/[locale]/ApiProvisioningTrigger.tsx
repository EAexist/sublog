'use client'

import { triggerProvisioning } from '@/lib/api'
import { useEffect, useRef } from 'react'

export function ApiProvisioningTrigger() {
    const hasTriggered = useRef(false)

    useEffect(() => {
        if (!hasTriggered.current) {
            triggerProvisioning().catch(error => {
                if (error.status === 401) {
                    console.log('Unauthorized')
                }
                else {
                    console.error(error)
                }
            })
            hasTriggered.current = true
        }
    }, [])
    return null
}