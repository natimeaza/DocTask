import React from 'react'
import DRimg from '../IMG/Dr.jpeg'
import Calendar from './Calander.js'

const Left = ({ setSelectedDate }) => {
  return (
    
    <div className=' w-1/4 bg-white my-36 mx-8 rounded-3xl '>
       <div className='border-b pb-6'>
        <img className='rounded-3xl w-96 ml-9 -mt-32 ' src={DRimg} alt="" />
            <h1 className='font-bold uppercase py-3 ml-14 text-gray-700'>Dr </h1>
       </div>
        <div className=''>
            <Calendar setSelectedDate={setSelectedDate} />
        </div>
       
    </div>
  )
}

export default Left
