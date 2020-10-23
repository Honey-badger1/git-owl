import React from 'react';
import './Alert.css'

export const Alert = ({alert}) => {

  return (
    <div className={`Alert alert-${alert.type || 'secondary'} alert-dismissible`} role="alert">
      {alert.text}
      <button type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}
