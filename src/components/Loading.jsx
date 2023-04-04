import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
const Loading = () => {
  return (    

    <div className="loader-circle">
      Loadding...
      <p className="loader-content">
        <FontAwesomeIcon icon={faCloudArrowDown} beat size='2xl'/>
      </p>
      <div className="loader-line-mask">
        <div className="loader-line"></div>
      </div>
    </div>

  )
}

export default Loading