import React, { useState } from 'react';

const ImageWithFallback = ({ src, fallback, alt, style, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  
  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
      console.log('Image failed to load, using fallback:', fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={style}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
