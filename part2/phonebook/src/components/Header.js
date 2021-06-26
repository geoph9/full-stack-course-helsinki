import React from 'react'

const Header = ({ text }) => {
    return (
      <h1>{text}</h1>
    )
  }

const SubHeader = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

export default Header;
export { SubHeader }