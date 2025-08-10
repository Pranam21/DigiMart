import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to UserHome for consistent experience
    navigate('/home', { replace: true });
  }, [navigate]);

  return null; // This component just redirects
};

export default HomePage;
