import React from 'react'


function Button({children,
      type = 'button',
      bgColor = 'bg-color-500',
      textColor = 'White',
      className =' ',
      ...props
}) {
  
    
  
   return (
     <button className={`px-2 py-2 rouded-lg ${className} ${bgColor} ${textColor}  {...props}    `} >{children}</button>
  )
}

export default Button
