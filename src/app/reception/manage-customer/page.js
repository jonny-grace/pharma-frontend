'use client';
import ManagePatients from '@/Components/reception/ManagePatients'
import React, { Component } from 'react'

export class page extends Component {
  render() {
    return (
      <div className=' container mx-auto px-5 pb-16 mt-[110px] '><ManagePatients/></div>
    )
  }
}

export default page