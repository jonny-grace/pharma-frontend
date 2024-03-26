import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Switch from 'react-switch';
import { toast } from 'react-hot-toast';

const ManageNurse = () => {
  const router = useRouter();
  const [nurses, setNurses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  
  function showNotification(message, type) {
    toast[type](message, {
      duration: 5000, // 5 seconds
    });
  }

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/nurses`);
        const data = await response.json();
       console.log(data);
        setNurses(data);

      } catch (error) {
        console.error('Error fetching Nurses:', error);
      }
    };

    fetchNurses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggle = async (nurseId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/nurse/status/${nurseId}`, {
        nurseId,
        status: newStatus
      });
      const updatednurse = response.data;
      const updatedNurses = nurses.map((nurse) =>
        nurse.userId === updatednurse.userId ? updatednurse : nurse
      );
      setNurses(updatedNurses);
      showNotification(`nurse status updated`, 'success');
    //  window.location.reload();
    //   toast.success(`nurse ${updatednurse.nurseName} ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error updating nurse status:', error);
      showNotification('Failed to update nurse status', 'error');
      toast.error('Failed to update nurse status');
    }
  };

  const filteredNurses = nurses.filter((nurse) =>
    `${nurse.firstname} ${nurse.lastname} ${nurse.phoneNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const handleRegisterNurse = () => {
    router.push('/admin/register-nurse');
  };
  return (
    <div>
      <div className="flex justify-between mb-4">
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={handleRegisterNurse}
        >
          Register New Nurse
        </button>
        <div>

          <input
            type="text"
            className="w-72 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search nurses..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Nurse Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Activate/Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {filteredNurses.map((nurse, index) => (
            <tr key={nurse.userId}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{nurse.firstname} {nurse.lastname}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <Switch
                  onChange={() => handleToggle(nurse.userId, nurse.status)}
                  checked={nurse.status === 'active'}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNurse;