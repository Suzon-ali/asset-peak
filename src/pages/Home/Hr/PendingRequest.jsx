

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMyInfo from '../../../hooks/useMyInfo';
import moment from 'moment';
import toast from 'react-hot-toast';

const PendingRequest = () => {

  const {user, loading} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myInfo] = useMyInfo();
  const {company_name} = myInfo || {};


  const query = `&requestStatus=pending`

  const {
    data: pendingRequests,
    isLoading: isAssetsLoading,
    refetch,
  } = useQuery({
    queryKey: [company_name, "requests"],
    enabled: company_name !== undefined && !loading,
    queryFn: async () => {
      try {
        if (!company_name) {
          throw new Error("User email is not available.");
        }
        const res = await axiosSecure.get(
          `/requests/admin/pending?productCompanyName=${company_name}${query}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching assets:", error);
        throw error;
      }
    },
  });

  console.log(pendingRequests ,"pending Requests")

  const handleRequestApproved = async (request) => {
    if (!request?._id) {
      return;
    }
  
    try {
      const res = await axiosSecure.put(`/requests/admin/${request._id}`, {
        requestStatus: 'approved',
      });
  
      if (res.status === 200) {
        toast.success("Approved!");
        refetch();
      } else {
        toast.error("Failed to approve request");
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      toast.error("Error approving request: " + (error.response?.data?.error || error.message));
    }
  };

  const handleRequestRejecetd = async (request) => {
    if (!request?._id) {
      return;
    }
  
    try {
      const res = await axiosSecure.put(`/requests/admin/${request._id}`, {
        requestStatus: 'rejected',
      });
  
      if (res.status === 200) {
        toast.success("Approved!");
        refetch();
      } else {
        toast.error("Failed to approve request");
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      toast.error("Error approving request: " + (error.response?.data?.error || error.message));
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-xl font-semibold mb-6">Pending Requests</h1>
      
        
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
            {pendingRequests && pendingRequests.map((request) => (
              <tr key={request._id} className="text-sm">
                <td className="border px-4 py-2">{request.productName}</td>
                <td className="border px-4 py-2">{request.productType}</td>
                <td className="border px-4 py-2">{request.requestorName} ({request.requestedBy}) </td>
                <td className="border px-4 py-2">{moment(request.requestedDate).format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2">{request.description}</td>
                <td className="border px-4 py-2">{request.requestStatus}</td>
                <td className="border px-4 py-2">
                  <button onClick={()=>handleRequestApproved(request)} className="px-2 py-1 bg-green-500 text-white rounded-md mr-2">Approve</button>
                  <button onClick={()=>handleRequestRejecetd(request)} className="px-2 py-1 bg-red-500 text-white rounded-md">Reject</button>
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

  