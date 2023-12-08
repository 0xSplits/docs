import React, { useState } from 'react'

export function Toggle({ children, title, open }) {
  const [isVisible, setIsVisible] = useState(open ?? false)
  return (
    <div className="py-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        <div
          className={`transition ${
            isVisible ? `rotate-90 -translate-y-1` : `rotate-0`
          }`}
          style={{ width: '12px' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="pl-3">{title}</div>
      </div>
      {isVisible && (
        <div className="py-4" style={{ paddingLeft: '24px' }}>
          {children}
        </div>
      )}
    </div>
  )
}
