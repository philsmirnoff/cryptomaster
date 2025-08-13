import React, { useState } from 'react';
import { Avatar } from 'antd';

const AvatarWithFallback = ({ src, fallback, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  
  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
      console.log('Avatar failed to load, using fallback:', fallback);
    }
  };

  return (
    <Avatar
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default AvatarWithFallback;
