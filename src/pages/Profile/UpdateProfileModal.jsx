import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

function UpdateProfileModal({ closeModal }) {
  const { user, setLoading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await updateProfile(user, { displayName, photoURL });
      setLoading(false);
      closeModal();

      console.log("data", userUpdateResponse)
      toast.success('Profile updated successfully');
  
      navigate('/profile');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-700">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photoURL" className="block text-gray-700">Photo URL</label>
            <input
              type="text"
              id="photoURL"
              name="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfileModal;
