import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
const Loading = () => {
  return (    

    <div className="loader-circle">            
      <FontAwesomeIcon icon={faCloudArrowDown} beat size='2xl'/>
      Loading...
      <div className="loader-line-mask">
        <div className="loader-line"></div>
      </div>
    </div>

  )
}

export default Loading