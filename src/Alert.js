import React, { useEffect } from 'react'

  const Alert = ({type, msg , removeAlert, alertTime}) => {
  useEffect(() => {
      const timeout = setTimeout(() => {
        removeAlert()
      }, 3000)
      return () => clearTimeout(timeout)
  }, [alertTime])

  return (
      <p className={`alert alert-${type}`} >   {msg}  </p>
  )
}

export default Alert
