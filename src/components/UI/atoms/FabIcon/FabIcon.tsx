import { Fab, Tooltip } from '@mui/material';
import ImageSVG from '../ImageSVG/ImageSVG';

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
        <ImageSVG src={icon} width={width} title={title} />
      </Fab>
    </Tooltip>
  );
};

export default FabIcon;
