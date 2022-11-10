const ImageSVG = ({ src, width = 16, title = '', classes }: ImageSVGProps) => {
  return <img src={src} width={width} height={width} className={classes} alt={title} />;
};

export default ImageSVG;
