import React from 'react'

const SearchBox = (props) => {

  return (
    <div className='col col-sm-4'>
        <input type="text" className='form-control' onChange={(event)=>{props.setSearchVal(event.target.value)}} value={props.searchVal} placeholder='Type to search'/>
    </div>
  )
}

export default SearchBox