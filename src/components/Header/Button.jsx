
import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-500',
  hoverColor = 'hover:bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...Props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${hoverColor} ${textColor} ${className}`} type={type} {...Props}>
    {children}
    </button>
  )
}

export default Button