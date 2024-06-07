import React, { useEffect, useState } from 'react'
const Loader = () => {
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    const body = document.querySelector('body');
    if (loader) {
      body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      body.style.overflow = 'auto'; // Enable scrolling
    }
  
    // Cleanup function to reset overflow when component unmounts
    return () => {
      body.style.overflow = 'auto';
    };
  }, [loader]);
  
  return (
    <div className='loadingDiv'>
      <div aria-label="Loading..." role="status" class="loader">
      <div class="chaotic-orbit"></div>
  <span class="loading-text">Loading...</span>
</div>
    </div>
    
  )
}

export default Loader;