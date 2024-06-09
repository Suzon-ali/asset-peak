import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMyInfo from '../../../hooks/useMyInfo';
import toast from 'react-hot-toast';
import Spinner from '../../../utility/Loaders/Spinner';

const AddEmployee = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myInfo] = useMyInfo();
  const { company_name, company_logo } = myInfo || {};
  const [addEmployeLoading, setAddEmployeLoading] = useState(false)

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);

  const { data: employees, isLoading: isEmployeesLoading, refetch } = useQuery({
    queryKey: ['users'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get('/users/unaffiliated');
      return res.data;
    },
  });

  const handleCheckboxChange = (id) => {
    setSelectedEmployeeIds((prevIds) =>
      prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
    );
  };

  const handleBulkUpdate = async () => {
    setAddEmployeLoading(true)
    try {
      const res = await axiosSecure.put('/users/add-employee', {
        ids: selectedEmployeeIds,
        companyName: company_name,
        company_logo: company_logo
      });
      if (res.data.modifiedCount > 0) {
        toast.success('Company name updated for selected employees');
        refetch();
        setSelectedEmployeeIds([]);
        setAddEmployeLoading(false)
      }
    } catch (error) {
      console.error('Error updating company name:', error);
      toast.error('Failed to update company name');
      setAddEmployeLoading(false)
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6">Employee Page</h2>

      {/* Package Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Package</h3>
        <p className="mb-4">Current Package Limit: 10 members</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {/* Sample packages, replace with actual packages */}
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <span>5 members for $5</span>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
              Upgrade
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <span>10 members for $8</span>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
              Upgrade
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <span>20 members for $15</span>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* List of Unaffiliated Users */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
          Unaffiliated Users ({employees?.length})
        </h3>
        {employees &&
          employees.map((employee) => (
            <div
              key={employee._id}
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedEmployeeIds.includes(employee._id)}
                  onChange={() => handleCheckboxChange(employee._id)}
                  className="mr-4"
                />
                <img
                  src={employee.imageUrl}
                  alt={employee.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <p className="ml-4">{employee.name}</p>
              </div>
            </div>
          ))}
        <button
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-500"
          onClick={handleBulkUpdate}
        >
          {!addEmployeLoading ? 'Add Employee' : <Spinner /> }
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
