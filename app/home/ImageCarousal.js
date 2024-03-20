import React from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imageUrls = [
  '/images/image2.jpg',
];

const ImageCarousel = () => {

  return (
    <div className="flex flex-col items-center justify-center mt-7">
      <div className="w-2/3 aspect-w-1 aspect-h-1">
        <img src={imageUrls[0]} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ImageCarousel;