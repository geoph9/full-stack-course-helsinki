import React from 'react'

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div>
      Find Countries: <input value={filterValue} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter