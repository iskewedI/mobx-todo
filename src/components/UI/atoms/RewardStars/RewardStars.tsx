import { useEffect, useState } from 'react';
import ImageSVG from '../ImageSVG/ImageSVG';
import DottedStar from '../../../../assets/images-svg/DottedStar.svg';
import GoldenStar from '../../../../assets/images-svg/GoldenStar.svg';
import './RewardStars.css';

const RewardStars = ({ mountOnlyOnce, start, onMount }: RewardStarsProps) => {
  const [mounted, setMounted] = useState<boolean>();

  useEffect(() => {
    if (!mounted) {
      setTimeout(() => {
        onMount && onMount();
        setMounted(true);
      }, 1000);
    }

    if (start) {
      setMounted(false);
    }
  }, [mounted, start]);

  if ((mountOnlyOnce && mounted) || !start) return <></>;

  return (
    <div className='reward-stars-container'>
      <ImageSVG classes='reward-stars__star' src={GoldenStar} />
      <div>
        <ImageSVG classes='reward-stars__decoration-left' src={DottedStar} />
        <ImageSVG classes='reward-stars__decoration-right' src={DottedStar} />
      </div>
    </div>
  );
};

export default RewardStars;
