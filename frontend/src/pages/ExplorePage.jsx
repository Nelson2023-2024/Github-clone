import { useState } from 'react';
import toast from 'react-hot-toast';

import Spinner from '../components/Spinner';
import Repos from '../components/Repos';

const ExplorePage = () => {
  const [loading, setLoading] = useState(false); // Correctly destructured
  const [repos, setRepos] = useState([]); // Correctly destructured
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Correctly destructured

  const exploreRepos = async (language) => {
    setLoading(true);
    setRepos([]);
    setSelectedLanguage(language); // Set the selected language when exploring

    try {
      const response = await fetch(`/api/explore/repos/${language}`);
      const { repos } = await response.json();
      setRepos(repos.items);
      console.log(repos.items);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          <img
            src="/javascript.svg"
            alt="JavaScript"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos('javascript')}
          />
          <img
            src="/typescript.svg"
            alt="TypeScript logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos('typescript')} // Added functionality for TypeScript
          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos('cpp')} // Added functionality for C++
          />
          <img
            src="/python.svg"
            alt="Python logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos('python')} // Added functionality for Python
          />
          <img
            src="/java.svg"
            alt="Java logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos('java')} // Added functionality for Java
          />
        </div>
        {repos.length > 0 && (
          <h2 className="text-lg font-semibold text-center my-4">
            <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full ">
              {selectedLanguage.toUpperCase()}{' '}
            </span>
            Repositories
          </h2>
        )}
        {!loading && repos.length > 0 && (
          <Repos repos={repos} alwaysFullWidth />
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default ExplorePage;
