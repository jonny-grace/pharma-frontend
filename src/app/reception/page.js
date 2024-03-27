'use client';

import NotificationComponent from '@/Components/BrowserNotification';
import withAuth from '@/Components/auth/withAuth';
import Dashboard from '@/Components/reception/Dashboard';
import ManagePatients from '@/Components/reception/ManagePatients';
import Prescriptions from '@/Components/reception/Prescriptions';
import Sidebar from '@/Components/reception/SideBar';
import { useState } from 'react';


function page() {
  const [activeOption, setActiveOption] = useState('Patients');

 

  const handleOptionClick = (option) => {
    setActiveOption(option);
  }

  return (
    
    <div className="mt-[110px]">
     <ManagePatients />
    </div>
  );
}


export default withAuth(page);