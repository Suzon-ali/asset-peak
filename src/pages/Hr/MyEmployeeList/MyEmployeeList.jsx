import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMyInfo from '../../../hooks/useMyInfo';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useState } from 'react';
import Spinner from '../../../utility/Loaders/Spinner';
import toast from 'react-hot-toast';

const MyEmployeeList = () => {
  const { loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [myInfo] = useMyInfo();
  const { company_name , _id } = myInfo || {};
  const [removing, setRemoving] = useState(false);

  const {
    data: teamMembers,
    isLoading: isAssetsLoading,
    refetch,
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

  const handleRemoveMember = async (memberId) => {
    setRemoving(true);
    try {
      const res = await axiosSecure.put(`/users/team/${memberId}`,{
        companyName: "",
        company_logo: "",
        role: ''
      });
      console.log(res)
      if(res.status === 200){
        toast.success(res.data.message)
        refetch(); 
      }
      
    } catch (error) {
      console.error('Error removing team member:', error);
    } finally {
      setRemoving(false);
    }
  };

  console.log(teamMembers)

  if (isAssetsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6">Team Members</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers && teamMembers.map((member) => (
          <div
            key={member._id} // Ensure to use a unique key
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-500 mb-2">{member.memberType}</p>
              <button disabled={_id === member._id}
                className={`px-4 py-2 text-white rounded-md  ${_id === member._id ? "bg-green-500 hover:bg-green-600 cursor-wait" : ' bg-red-500 hover:bg-red-600'}`}
                onClick={() => handleRemoveMember(member._id)}
              >
              {_id === member._id ? "Me" : <>{!removing ? "Remove From Team" : <Spinner />}</>}
                
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEmployeeList;
