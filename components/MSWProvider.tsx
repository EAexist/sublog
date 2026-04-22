'use client'

import { useEffect, useState } from 'react'

export function MSWProvider({ children }: { children: React.ReactNode }) {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        // console.log('MSW_ENABLED:', process.env.NEXT_PUBLIC_MSW_ENABLED)
        // console.log("process.env.NEXT_PUBLIC_MSW_ENABLED !== 'true'", process.env.NEXT_PUBLIC_MSW_ENABLED !== 'true')
        if (process.env.NEXT_PUBLIC_MSW_ENABLED !== 'true') {
            setIsReady(true)
            return
        }

        const initMSW = async () => {
            try {
                const { worker } = await import('../mocks/browser')
                // Await start() ensures the Service Worker is REGISTERED and ACTIVE
                await worker.start({
                    onUnhandledRequest: 'warn',
                    serviceWorker: { url: '/mockServiceWorker.js' },
                })
                if (!navigator.serviceWorker.controller) {
                    await new Promise<void>((resolve) => {
                        navigator.serviceWorker.addEventListener('controllerchange', () => {
                            resolve()
                        })
                    })
                }
                console.log('MSW: Ready')
                setIsReady(true) // Now we allow children to mount
            } catch (error) {
                console.error('MSW: Failed', error)
                setIsReady(true)
            }
        }

        initMSW()
    }, [])

    // If not ready, we return null to prevent ApiProvisioningTrigger 
    // and other components from firing fetches too early.
    if (!isReady) return null

    return <>{children}</>
}
