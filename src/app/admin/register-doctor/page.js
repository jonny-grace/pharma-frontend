'use client';
import RegisterDoctor from '@/Components/Admin/RegisterDoctor'
import withAuth from '@/Components/auth/withAuth'
import React from 'react'

function page() {
  return (
    <div className=" mt-[90px] bg-white"><RegisterDoctor /></div>
  )
}

export default page