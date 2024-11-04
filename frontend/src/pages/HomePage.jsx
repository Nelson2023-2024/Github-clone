import { useCallback, useEffect, useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState('recent');

  const getUserProfileAndRepos = useCallback(
    async (username = 'Nelson2023-2024') => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5001/api/users/profile/${username}`
        );
        if (!response.ok) throw new Error('Failed to fetch user profile');

        const { repos, userProfile } = await response.json();
        setUserProfile(userProfile);

        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending
        setRepos(repos);

        console.log('userProfile:', userProfile);
        console.log('Repos:', repos);

        return { repos, userProfile };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const { userProfile, repos } = await getUserProfileAndRepos(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType('recent');
  };

  const onSort = (sortType) => {
    switch (sortType) {
      case 'recent':
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Descending order, recent first
        break;
      case 'stars':
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count); // Descending order, most stars at top
        break;
      case 'forks':
        repos.sort((a, b) => b.forks_count - a.forks_count); // Descending order, most forks at top
        break;
      default:
        break;
    }
    setSortType(sortType);
    setRepos([...repos]);
  };
  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}

      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

        {!loading && <Repos repos={repos} />}

        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
