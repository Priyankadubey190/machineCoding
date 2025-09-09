import { useCallback, useEffect, useState } from "react";
import styles from "./carousel.module.scss";
import { FaAngleLeft, FaAngleRight, FaPlay, FaPause } from "react-icons/fa";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay: boolean;
  autoPlayInterval: number;
  showDots: boolean;
  showArrows: boolean;
}

export const Carousel: React.FC<CarouselProps> = (props) => {
  const { items, autoPlay, autoPlayInterval, showDots, showArrows } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, items.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, items.length]);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (!isPlaying || items.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPlaying, autoPlayInterval, items.length, nextSlide]);

  if (items.length === 0) {
    return <div className={styles.carousel}>No item to display</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      <h1>Carousel</h1>
      <div className={styles.carousel}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => {
            return (
              <div key={item.id} className={styles.carouselItem}>
                <h2>{item.title}</h2>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.carouselImage}
                />
              </div>
            );
          })}
        </div>

        {showArrows && items.length > 1 && (
          <div className={styles.carouselControls}>
            <button className={styles.prevButton} onClick={prevSlide}>
              <FaAngleLeft />
            </button>
            <button className={styles.nextButton} onClick={nextSlide}>
              <FaAngleRight />
            </button>
          </div>
        )}

        {autoPlay && items.length > 1 && (
          <button className={styles.playPauseBtn} onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        )}
      </div>

      {showDots && items.length > 1 && (
        <div className={styles.dotContainer}>
          {items.map((item, index) => (
            <button
              key={item.id}
              className={`${styles.dot} ${
                index === currentIndex ? styles.dotActive : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};
