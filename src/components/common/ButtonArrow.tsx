import { VerticalDirection } from '../../types/enums';
import UpArrow from '../../static/images-svg/UpArrow.svg';
import DownArrow from '../../static/images-svg/DownArrow.svg';
import './common.css';

type Props = {
  direction: VerticalDirection;
  disabled?: boolean;
  width?: number;
  onClick?: () => void;
};

const ButtonArrow = ({ direction, onClick, disabled = false, width = 12 }: Props) => {
  return (
    <button
      className={`unstyled arrow ${(!disabled && 'hoverable') || ''}`}
      title={direction === VerticalDirection.Down ? 'Down arrow' : 'Up arrow'}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        src={direction === VerticalDirection.Down ? DownArrow : UpArrow}
        width={width}
        height={width}
      />
    </button>
  );
};

export default ButtonArrow;