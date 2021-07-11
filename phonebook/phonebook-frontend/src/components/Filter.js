import React from 'react'

const Filter = ({ filterValue, handleFilterNames }) => {
  return (
    <div>
      Filter shown with: <input value={filterValue} onChange={handleFilterNames} />
    </div>
  )
}

export default Filter