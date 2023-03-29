import React, { useState } from 'react'

export function Toggle({ children, title, open }) {
  const [isVisible, setIsVisible] = useState(open ?? false)
  return (
    <div className="my-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        <div
          className={`transition ${
            isVisible ? `rotate-90 -translate-y-1` : `rotate-0`
          }`}
          style={{ width: '12px', fontSize: '14px' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">{title}</div>
      </div>
      {isVisible && (
        <div className="py-2 ml-3" style={{ paddingLeft: '12px' }}>
          {children}
        </div>
      )}
    </div>
  )
}
