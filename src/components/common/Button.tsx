import React from 'react'

export default function Button ({ onClick, text, dataTest }: { onClick: (e: any) => void, text: string, dataTest?: string }) {
    return (
        <button
            data-test={dataTest}
            data-type="button"
            className='bg-gray-200 text-gary-500 px-5 py-2 rounded-md hover:bg-gray-400'
            onClick={onClick}
        >
            {text}
        </button>
    )
}
