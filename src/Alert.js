import React, { useEffect } from 'react'

  const Alert = ({type, msg , removeAlert, alertTime}) => {
  useEffect(() => {
      const timeout = setTimeout(() => {
        removeAlert()
      }, 3000)
      return () => clearTimeout(timeout)
  }, [alertTime])

  return (
      <p className={`alert alert-${type}`} >   {msg}   <span style={{display: type==='success'? "contents" : "none"}}> has been added to the list </span> </p>
  )
}

export default Alert
