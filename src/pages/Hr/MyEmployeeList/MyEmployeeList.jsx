
import  { useState } from 'react';

const MyEmployeeList = () => {
  
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      memberType: 'Admin',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 1,
      name: 'John Doe',
      memberType: 'Admin',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
   
  ]);

  const handleRemoveMember = (memberId) => {
    setTeamMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== memberId)
    );
   
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6">Team Members</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
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
                onClick={() => handleRemoveMember(member.id)}
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
