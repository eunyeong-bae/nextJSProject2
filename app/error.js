'use client'

export default function Error({error, reset}) {
    return (
        <div>
            <h3>에러남</h3>
            <button onClick={() => reset()}>button</button>
        </div>
    )
}