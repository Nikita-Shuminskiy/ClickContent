import { useEffect, useState } from 'react'

export const CurrentTime = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")
        const seconds = String(date.getSeconds()).padStart(2, "0")
        return `${hours}:${minutes}:${seconds}`
    }

    return (
        <time className="block text-center text-5xl font-bold">
            {formatTime(time)}
        </time>
    )
}