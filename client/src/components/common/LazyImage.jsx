import { useState, useEffect, useRef } from 'react';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23778DA9" width="400" height="300"/%3E%3Ctext fill="%23E0E1DD" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ELoading...%3C/text%3E%3C/svg%3E',
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    let observer;
    let mounted = true;

    const currentImgRef = imgRef.current;

    if (currentImgRef && !imageLoaded && !imageError) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && mounted) {
              // Start loading the actual image
              const img = new Image();

              img.onload = () => {
                if (mounted) {
                  setImageSrc(src);
                  setImageLoaded(true);
                  if (onLoad) onLoad();
                }
              };

              img.onerror = () => {
                if (mounted) {
                  setImageError(true);
                  setImageSrc('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23415A77" width="400" height="300"/%3E%3Ctext fill="%23E0E1DD" font-family="sans-serif" font-size="20" dy="10.5" x="50%25" y="50%25" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E');
                  if (onError) onError();
                }
              };

              img.src = src;

              if (observer && currentImgRef) {
                observer.unobserve(currentImgRef);
              }
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.01
        }
      );

      observer.observe(currentImgRef);
    }

    return () => {
      mounted = false;
      if (observer && currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [src, imageLoaded, imageError, onLoad, onError]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-70'
        } ${className}`}
      loading="lazy"
    />
  );
};

export default LazyImage;
