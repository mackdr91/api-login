import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HideableLink({ to, children }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);  // Hide the link after it is clicked
  };

  return (
    <>
      {isVisible && (
        <Link to={to} onClick={handleClick}>
          {children}
        </Link>
      )}
    </>
  );
}

export default HideableLink;
