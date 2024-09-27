'use client'
import React from 'react'
import { useRouter } from 'next/navigation'



const Page = () => {
 const router = useRouter();
  return (
    <div className='w-screen h-screen flex flex-col space-y-6 items-center justify-center'> 
      <p>hello welcome to my page</p>
      <p>please proceed to see CRUD operations</p>
      <button onClick={()=>router.push('./apiclient')} className='w-auto h-[40px] border-2 rounded-lg border-black px-2 '>click me</button>
    </div>
  )
}

export default Page