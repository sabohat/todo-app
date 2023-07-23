import React from 'react'

export default function Button ({ onClick, text }: { onClick: (e: any) => {}, text: string }) {
    return (
        <button
            className='bg-gray-200 text-gary-500 px-5 py-2 rounded-md hover:bg-gray-400'
            onClick={onClick}
        >
            {text}
        </button>
    )
}
