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

  const options = [
    // {
    //   name: 'Dashboard',
    //   component: <Dashboard />
    // },
    {
      name: 'Patients', 
      component: <ManagePatients />
    },
    {
      name: 'Prescriptions',
      component: <Prescriptions />
    },
    // {
    //   name: 'showNotifcation',
    //   component: <NotificationComponent />
    // },
    // {
    //   name: 'Logout',
    // }
  ];

  const handleOptionClick = (option) => {
    setActiveOption(option);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        options={options}
        activeOption={activeOption}
        onOptionClick={handleOptionClick} 
      />

      <MainContent>
        {options.find(o => o.name === activeOption)?.component}  
      </MainContent>
    </div>
  );
}



function MainContent({children}) {
  return (
    <div className="flex-1 p-5">
      {children}
    </div>
  );
}

export default withAuth(page);