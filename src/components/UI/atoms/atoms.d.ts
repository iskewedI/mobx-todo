type FabIconProps = {
  icon: string;
  width?: number;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
  title?: string;
  classes?: string;
};

type RewardStarsProps = {
  mountOnlyOnce?: boolean;
  start: boolean;
  onMount?: () => void;
};

type ImageSVGProps = {
  src: string;
  width?: number;
  title?: string;
  classes?: string;
};
