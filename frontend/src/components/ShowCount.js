import React from 'react'

const ShowCount = (props) => {
  return (
    <div className='showCount'>
      <h4>{props.title}</h4>
      <h2>{props.count}</h2>
    </div>
  )
}

export default ShowCount