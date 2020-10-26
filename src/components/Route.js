import { useEffect } from 'react';

const Route = ({ path, children }) => {
  // Listener to listen change in URL
  useEffect(() => {
    const onLocationChange = () => {
      console.log('Location Change');
    };

    // Add Event Listener
    window.addEventListener('popstate', onLocationChange);

    // CleanUp Function to remove the Listener when the component is removed from DOM.
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);
  return window.location.pathname === path ? children : null;
};

export default Route;
