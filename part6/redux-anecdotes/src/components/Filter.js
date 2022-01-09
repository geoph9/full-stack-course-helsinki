import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    console.log('event.target', event.target.value)
    const filterValue = event.target.value
    props.filterChange(filterValue)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange,
}

const ConnectedNotes = connect(null, mapDispatchToProps)(Filter)
export default ConnectedNotes