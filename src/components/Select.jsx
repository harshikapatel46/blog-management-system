import React, {useId} from 'react'

function Select({
  options,
  label,
  className = '',
  ...props
},ref) {
  const id = useId()
  return (
    <div className='w-full'>{label &&
    <label htmlFor={id}>{label}</label>}
    <select {...props} 
    id={id}
    className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
    ref={ref}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    
    
    </div >
  )
}

export default React.forwardRef(Select)