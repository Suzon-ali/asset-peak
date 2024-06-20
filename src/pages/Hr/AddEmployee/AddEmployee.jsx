import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMyInfo from '../../../hooks/useMyInfo';
import toast from 'react-hot-toast';
import Spinner from '../../../utility/Loaders/Spinner';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AddEmployee = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [myInfo] = useMyInfo();
  const { company_name, company_logo , max_employee, _id } = myInfo || {};
  const [addEmployeLoading, setAddEmployeLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);

  const { data: employees, isLoading: isEmployeesLoading, refetch } = useQuery({
    queryKey: ['users'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get('/users/unaffiliated');
      return res.data;
    },
  });

  const {
    data: teamMembers,
    isLoading: isAssetsLoading,
    refetch: teamRefetch,
  } = useQuery({
    queryKey: ['teamMembers', company_name],
    enabled: !!company_name && !loading,
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/users/team?company_name=${company_name}`);
        return res.data;
      } catch (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }
    },
  });

  const currentTeamMembers = teamMembers?.length;
  const totalEmployees = (selectedEmployeeIds?.length || 0) + currentTeamMembers;

  const handleCheckboxChange = (id) => {
    setSelectedEmployeeIds((prevIds) =>
      prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
    );
  };
 
  const handleBulkUpdate = async () => {

    if (totalEmployees > max_employee) {
        toast.error("Increase your Limit");
        return;
    }else{
      setAddEmployeLoading(true);
    try {
        const res = await axiosSecure.put('/users/add-employee', {
            ids: selectedEmployeeIds,
            companyName: company_name,
            company_logo: company_logo
        });
        if (res.data.modifiedCount > 0) {
            toast.success('Company name updated for selected employees');
            refetch();
            teamRefetch();
            setSelectedEmployeeIds([]);
            setAddEmployeLoading(false);
        }
    } catch (error) {
        console.error('Error updating company name:', error);
        toast.error('Failed to update company name');
        setAddEmployeLoading(false);
    }
    }

    
};

const handleSelectPackage = async (package_price) =>{

  const userInfo = {
    package: package_price
  }
  const res = await axiosSecure.put(`/users/update-package/${_id}`, userInfo);
  console.log(res)
  if(res.status === 200){
    navigate('/checkout')
  }
}



  return (
    <div className="max-w-5xl mx-auto py-8">

<Helmet>
        <title>AssetPeak | Add Employee</title>
      </Helmet>


      <h2 className="text-3xl font-semibold mb-6">Employee Page</h2>

      {/* Package Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Package</h3>
        <p className="mb-4">Current Package Limit: {max_employee}</p>
        <p className="mb-4">Current Team Members: {currentTeamMembers}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {/* Sample packages, replace with actual packages */}
          <div className={`bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200`}>
            <span>5 members for $5</span>
            <button onClick={()=>handleSelectPackage(5)} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
              Upgrade
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <span>10 members for $8</span>
            <button onClick={()=>handleSelectPackage(8)} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
              Upgrade
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <span>20 members for $15</span>
            <button onClick={()=>handleSelectPackage(15)} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
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
        <button disabled={totalEmployees >= max_employee}
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
