import React from 'react'

const Loading = () => {
  return (    

    <div className="loader-circle">
      <p className="loader-content">Loading...</p>
      <div className="loader-line-mask">
        <div className="loader-line"></div>
      </div>
    </div>

  )
}

export default Loading