import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/auth/check-auth-user`, {
          credentials: 'include',
        });

        const data = await response.json();

        setAuthUser(data.user); //user oj or null
      } catch (error) {
        toast.error('Unauthorized');
        console.log('Error autheniticationg', error.message);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
