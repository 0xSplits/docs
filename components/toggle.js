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
          className={`transition ${isVisible ? `rotate-90` : `rotate-0`}`}
          style={{ width: '12px', fontSize: '14px' }}
        >
          ►
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
