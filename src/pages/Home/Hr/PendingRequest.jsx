

import  { useState } from 'react';

const PendingRequest = () => {
  // Dummy data for demonstration purposes
  const [requests, setRequests] = useState([
    {
      id: 1,
      assetName: 'Laptop',
      assetType: 'Hardware',
      requesterEmail: 'john.doe@example.com',
      requesterName: 'John Doe',
      requestDate: 'June 1, 2024',
      additionalNote: 'Need a new laptop for software development tasks.',
      status: 'Pending',
    },
    // Add more request items as needed
  ]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered requests based on search query
  const filteredRequests = requests.filter((request) =>
    request.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.requesterEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change


  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-xl font-semibold mb-6">Pending Request</h1>
      
      
      {/* Request List Section */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Asset Name</th>
              <th className="px-4 py-2">Asset Type</th>
              <th className="px-4 py-2">Requester</th>
              <th className="px-4 py-2">Request Date</th>
              <th className="px-4 py-2">Additional Note</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id} className="text-sm">
                <td className="border px-4 py-2">{request.assetName}</td>
                <td className="border px-4 py-2">{request.assetType}</td>
                <td className="border px-4 py-2">{request.requesterName} ({request.requesterEmail})</td>
                <td className="border px-4 py-2">{request.requestDate}</td>
                <td className="border px-4 py-2">{request.additionalNote}</td>
                <td className="border px-4 py-2">{request.status}</td>
                <td className="border px-4 py-4 lg:flex">
                  <button className="px-2 py-1 bg-green-500 text-white rounded-md mr-2">Approve</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded-md">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequest;

  