import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAuth';
import Spinner from '../components/common/Spinner';
import axios from 'axios';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAppContext();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent double execution
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        
        // Store in session storage
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Update context
        setUser(user);
        
        // Redirect to dashboard immediately
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/auth?error=invalid_data', { replace: true });
      }
    } else {
      navigate('/auth?error=missing_credentials', { replace: true });
    }
  }, [searchParams, navigate, setUser]);

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
