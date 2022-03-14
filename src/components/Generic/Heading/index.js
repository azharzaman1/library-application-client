const Heading = ({ type, className, children, ...rest }) => {
  if (type === "primary" || !type)
    return (
      <h1
        className={`text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-primaryText ${className}`}
        {...rest}
      >
        {children}
      </h1>
    );

  if (type === "secondary")
    return (
      <h2
        className={`text-lg sm:text-xl md:text-2xl tracking-tight font-semibold text-primaryText ${className}`}
        {...rest}
      >
        {children}
      </h2>
    );

  if (type === "tertiary")
    return (
      <h2
        className={`text-sm md:text-base lg:text-lg font-medium text-primaryText ${className}`}
        {...rest}
      >
        {children}
      </h2>
    );
};

export default Heading;
