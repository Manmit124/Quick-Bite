"use client"
import userprofile from '@/app/hook/userprofile'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [users, setusers] = useState();
const {loading,data}=userprofile();
useEffect(()=>{
fetch('/api/users').then(res=>{
    res.json().then(users=>{
setusers(users)
    })
})
},[])
if(loading){
    return 'Loading user info..'
}

  return (
    
      <div className="mt-5 ">
      <div className="py-5 mx-auto text-center flex flex-col items-center ">Helow users
      {users.length>0 && users.map(c=>(
        <div>
            {c.name}
            {/* 8:28 */}
        </div>
      ))}
      </div>
    </div>
  )
}

export default page
