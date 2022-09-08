import React, { useState } from 'react'

export function Toggle({ children, title, open }) {
  const [isVisible, setIsVisible] = useState(open ?? false)
  return (
    <div className="my-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        <div style={{ width: '12px', fontSize: '14px' }}>
          {isVisible ? `▼` : `►`}
        </div>
        <div className="ml-2">{title}</div>
      </div>
      {isVisible && (
        <div className="py-2 ml-2" style={{ paddingLeft: '12px' }}>
          {children}
        </div>
      )}
    </div>
  )
}
