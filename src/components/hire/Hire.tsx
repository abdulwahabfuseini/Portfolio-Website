import React from 'react'
import HeadTitle from '../HeadTitle'
import HireForm from './HireForm'

const Hire = () => {
  return (
    <div>
     <HeadTitle title="Need a Project" text="Hire Me" />
     <div className='grid place-content-center place-items-center py-10'>
       <h1 className=' text-center text-xl sm:text-3xl capitalize'>Got a project for me?</h1>
       <p className=''> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aliquid alias vero!</p>
     </div>
     <HireForm />
    </div>
  )
}

export default Hire