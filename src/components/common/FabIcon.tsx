import { Fab, Tooltip } from '@mui/material';
import './common.css';

type Props = {
  icon: string;
  width?: number;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
  title?: string;
  classes?: string;
};

const FabIcon = ({
  icon,
  onClick,
  title,
  tooltip,
  width = 12,
  disabled = false,
  classes = '',
}: Props) => {
  return (
    <Tooltip title={tooltip}>
      <Fab
        className={`${classes} fab-icon`}
        title={title}
        size='small'
        onClick={onClick}
        disabled={disabled}
      >
        <img src={icon} width={width} height={width} alt={title} />
      </Fab>
    </Tooltip>
  );
};

export default FabIcon;
