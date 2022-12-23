import React from 'react'
import { BarLoader } from 'react-spinners'

const Permission = () => {
  return (
    <div className=' text-center text-dark  permisshion' >
      <div >
        <h4>You Don't have permissions to view this page..</h4>
        <BarLoader className='mx-auto mt-2' color="#000" />
      </div>
      
    </div>
  )
}

export default Permission
