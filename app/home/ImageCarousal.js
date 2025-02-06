import Image from 'next/image';

const imageUrls = [
  '/images/image2.jpg',
];

const ImageCarousel = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-7">
      <div className="w-2/3 aspect-w-1 aspect-h-1">
        <Image 
          src={imageUrls[0]} 
          alt="Carousel Image" 
          width={1000} // 原始图片宽度
          height={700} // 原始图片高度
          layout="responsive" // 响应式布局
          priority // This ensures the image is loaded as a priority
        />
      </div>
    </div>
  );
};

export default ImageCarousel;