import { Fab, Tooltip } from '@mui/material';

const FabIcon = ({
  icon,
  onClick,
  title,
  tooltip,
  width = 12,
  disabled = false,
  classes = '',
}: FabIconProps) => {
  return (
    <Tooltip title={tooltip}>
      <Fab
        style={{ margin: '0.5rem', width: '33px', height: '30px' }}
        className={classes}
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
