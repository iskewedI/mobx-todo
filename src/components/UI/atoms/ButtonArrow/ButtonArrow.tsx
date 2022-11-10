import { VerticalDirection } from '../../../../types/enums';
import UpArrow from '../../../../assets/images-svg/UpArrow.svg';
import DownArrow from '../../../../assets/images-svg/DownArrow.svg';
import './ButtonArrow.css';
import ImageSVG from '../ImageSVG/ImageSVG';

type Props = {
  direction: VerticalDirection;
  disabled?: boolean;
  width?: number;
  onClick?: () => void;
};

const ButtonArrow = ({ direction, onClick, disabled = false, width = 12 }: Props) => {
  const title = direction === VerticalDirection.Down ? 'Down arrow' : 'Up arrow';

  return (
    <button
      className={`unstyled arrow ${(!disabled && 'hoverable') || ''}`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      <ImageSVG
        src={direction === VerticalDirection.Down ? DownArrow : UpArrow}
        width={width}
        title={title}
      />
    </button>
  );
};

export default ButtonArrow;
