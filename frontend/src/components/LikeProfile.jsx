import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
const LikeProfile = ({ userProfile }) => {
  const { authUser } = useAuthContext();

  //prevert liking ones own profile
  const isOwnProfile = authUser?.username === userProfile?.login;

  const handleLikeProfile = async () => {
    try {
      const response = await fetch(`/api/users/like/${userProfile.login}`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        // Custom error handling for different status codes
        if (response.status === 404) {
          throw new Error('User not found in our records');
        } else if (response.status === 400) {
          throw new Error('You have already liked this profile.');
        } else {
          throw new Error('An unexpected error occurred.');
        }
      }

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!authUser || isOwnProfile) return null;

  return (
    <button
      className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2"
      onClick={handleLikeProfile}
    >
      <FaHeart size={16} /> Like Profile
    </button>
  );
};

export default LikeProfile;
