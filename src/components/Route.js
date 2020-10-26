import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
  // Setting initial state if the page is refreshed by the user, else it will show blank page.
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Listener to listen change in URL
  useEffect(() => {
    const onLocationChange = () => {
      // To reload the Route by changing the state
      setCurrentPath(window.location.pathname);
    };

    // Add Event Listener
    window.addEventListener('popstate', onLocationChange);

    // CleanUp Function to remove the Listener when the component is removed from DOM.
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  // currentPath or window.location.pathname anything is fine.
  // If, 'currentPath' then in the above state declaration, we are giving 'window.location.pathname' as initial state
  // Else, 'window.location.pathname', no need to mention the initiat state in above state declaration
  return currentPath === path ? children : null;
};

export default Route;
