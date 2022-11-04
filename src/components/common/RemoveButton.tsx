import { Fab } from '@mui/material';
import Cross from '../../static/images-svg/Cross.svg';
import './common.css';

type Props = {
  width?: number;
  onClick?: () => void;
  disabled?: boolean;
};

const RemoveButton = ({ onClick, width = 12, disabled = false }: Props) => {
  return (
    <Fab
      className='remove-btn'
      title='Remove'
      size='small'
      onClick={onClick}
      disabled={disabled}
    >
      <img src={Cross} width={width} height={width} />
    </Fab>
  );
};

export default RemoveButton;
