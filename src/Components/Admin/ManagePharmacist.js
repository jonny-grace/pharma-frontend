import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Switch from 'react-switch';
import { toast } from 'react-hot-toast';

const ManagePharmacist = () => {
  const router = useRouter();
  const [Pharmaciest, setPharmaciest] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  
  function showNotification(message, type) {
    toast[type](message, {
      duration: 5000, // 5 seconds
    });
  }

  useEffect(() => {
    const fetchPharmaciest = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pharmaciest`);
        const data = await response.json();
      //  console.log(data);
        setPharmaciest(data);
      } catch (error) {
        console.error('Error fetching Pharmaciest:', error);
      }
    };

    fetchPharmaciest();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggle = async (pharmaciestId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/pharmaciest/status/${pharmaciestId}`, {
        pharmaciestId,
        status: newStatus
      });
      const updatedpharmaciest = response.data;
      const updatedPharmaciest = Pharmaciest.map((pharmaciest) =>
        pharmaciest.userId === updatedpharmaciest.userId ? updatedpharmaciest : pharmaciest
      );
      setPharmaciest(updatedPharmaciest);
      showNotification(`pharmaciest status updated`, 'success');
     window.location.reload();
    //   toast.success(`pharmaciest ${updatedpharmaciest.pharmaciestName} ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error updating pharmaciest status:', error);
      showNotification('Failed to update pharmaciest status', 'error');
      toast.error('Failed to update pharmaciest status');
    }
  };

  const filteredPharmaciest = Pharmaciest.filter((pharmaciest) =>
    `${pharmaciest.firstname} ${pharmaciest.lastname} ${pharmaciest.phoneNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const handleRegisterPatient = () => {
    router.push('/admin/register-pharmaciest');
  };
  return (
    <div>
      <div className="flex justify-between mb-4">
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={handleRegisterPatient}
        >
          Register pharmaciest
        </button>
        <div>

          <input
            type="text"
            className="w-72 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search Pharmaciest..."
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
              pharmaciest Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Activate/Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {filteredPharmaciest.map((pharmaciest, index) => (
            <tr key={pharmaciest.userId}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{pharmaciest.firstname} {pharmaciest.lastname}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <Switch
                  onChange={() => handleToggle(pharmaciest.userId, pharmaciest.status)}
                  checked={pharmaciest.status === 'active'}
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

export default ManagePharmacist;