import { Fab } from '@mui/material';
import './common.css';

type Props = {
  icon: string;
  width?: number;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  classes?: string;
};

const FabIcon = ({
  icon,
  onClick,
  title,
  width = 12,
  disabled = false,
  classes = '',
}: Props) => {
  return (
    <Fab
      className={`${classes} fab-icon`}
      title={title}
      size='small'
      onClick={onClick}
      disabled={disabled}
    >
      <img src={icon} width={width} height={width} />
    </Fab>
  );
};

export default FabIcon;
