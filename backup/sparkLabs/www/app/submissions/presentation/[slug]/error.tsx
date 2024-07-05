'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const divRef = useRef<any>(null);

    setTimeout(() => {
        if (divRef.current) {
            divRef.current.click();
        }
    }, 10);

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='flex-center min-h-screen w-full flex flex-col gap-3'>
            <h2>Checking your browser can run this project or not!</h2>
            <Button
                ref={divRef}
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => window.location.reload()
                }
            >
                Checking...
            </Button>
        </div>
    )
}
