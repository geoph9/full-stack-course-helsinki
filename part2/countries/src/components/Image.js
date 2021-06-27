import React from 'react'

const Image = ({url, width, height}) => {
  return (
    <img src={url} height={height} width={width} alt="" />
  )
}

export default Image