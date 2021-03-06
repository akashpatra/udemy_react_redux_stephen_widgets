import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    // Restore the feature of opening the link in new tab
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    
    // Prevent the default functionality of browser to reload the whole index.html
    event.preventDefault();

    // Change the URL
    window.history.pushState({}, '', href);

    // To Notify all ahref that URL has been changed.
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
