const Chip = ({
  children,
  className,
  shrink = true,
  color = "primary",
  size = "medium",
}) => {
  const colorSchemes = {
    light: "border-gray-300 hover:bg-gray-100 bg-opacity-95",
    lightContained: "border-gray-300 hover:bg-gray-100 bg-opacity-95",
    primary: "text-primary border-primary border-opacity-40",
    primaryContained: "text-white bg-primary border-primary border-opacity-40",
  };

  const sizes = {
    small: "py-1 px-2 text-sm hover:shadow-sm",
    medium: "pb-1.5 pt-1 px-3 text",
    large: "pb-2 pt-1.5 px-3",
  };

  return (
    <span
      className={`border-2 rounded-full hover:shadow transition-all duration-150 cursor-pointer select-none ${
        sizes[size]
      } ${colorSchemes[color]} ${shrink && "active:scale-95"} ${className}`}
    >
      <span>{children}</span>
    </span>
  );
};

export default Chip;
