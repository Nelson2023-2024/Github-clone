import { useCallback, useEffect, useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState('forks');

  const getUserProfileAndRepos = useCallback(async () => {
    setLoading(true);
    try {
      const userResponse = await fetch(
        'https://api.github.com/users/Nelson2023-2024'
      );
      const userProfile = await userResponse.json();
      setUserProfile(userProfile);

      const repoRes = await fetch(
        'https://api.github.com/users/Nelson2023-2024/repos'
      );
      const repos = await repoRes.json();
      setRepos(repos);

      console.log('userProfile:', userProfile);
      console.log('Repos:', repos);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);
  return (
    <div className="m-4">
      <Search />
      <SortRepos />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        <ProfileInfo />
        <Repos />
      </div>
    </div>
  );
};

export default HomePage;
