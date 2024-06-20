import { useState } from 'react';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';
import UpdateProfileModal from './UpdateProfileModal';

function Profile() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mx-auto my-10 ">
        <div className="flex flex-col items-center">
          <img className="w-24 h-24 rounded-full mb-4" src={user?.photoURL || 'https://via.placeholder.com/150'} alt="Profile Photo" />
          <h2 className="text-xl font-semibold mb-2">{user?.displayName || 'User Name'}</h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={openModal}
          >
            Update Profile
          </button>
        </div>
      </div>

      {isModalOpen && <UpdateProfileModal closeModal={closeModal} />}
    </>
  );
}

export default Profile;
