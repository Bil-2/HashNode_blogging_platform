import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAuth';
import Spinner from '../components/common/Spinner';
import axios from 'axios';
import { userService } from '../api/userService';
import { postService } from '../api/postService';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser, fetchPosts } = useAppContext();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent double execution (React StrictMode)
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processGoogleAuth = async () => {
      const token = searchParams.get('token');
      const userStr = searchParams.get('user');

      if (!token || !userStr) {
        navigate('/auth?error=missing_credentials', { replace: true });
        return;
      }

      try {
        const userData = JSON.parse(decodeURIComponent(userStr));

        // Map _id to id for frontend consistency
        const mappedUser = { ...userData, id: userData._id || userData.id };

        // Persist token & user in sessionStorage (same as regular login)
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(mappedUser));

        // Set axios default Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Update context user state
        setUser(mappedUser);

        // Load posts and users into context — without this the dashboard is empty
        try {
          const users = await userService.getAllUsers();
          await fetchPosts();
        } catch (dataError) {
          // Non-fatal: dashboard will still load but may show no content initially
          console.warn('GoogleAuthSuccess: failed to pre-load data:', dataError.message);
        }

        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('GoogleAuthSuccess: Error processing auth data:', error);
        navigate('/auth?error=invalid_data', { replace: true });
      }
    };

    processGoogleAuth();
  }, [searchParams, navigate, setUser, fetchPosts]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Spinner />
        <p className="mt-4 text-text-primary">Completing Google Sign In...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
