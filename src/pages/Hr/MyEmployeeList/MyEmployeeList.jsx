import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMyInfo from '../../../hooks/useMyInfo';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const MyEmployeeList = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [myInfo] = useMyInfo();
  const { company_name } = myInfo || {};

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
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-500 mb-2">{member.memberType}</p>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                // onClick={() => handleRemoveMember(member.id)}
              >
                Remove From Team
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEmployeeList;
