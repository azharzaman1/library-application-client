import Loader from "../Loader";

const Button = ({
  type = "primary",
  children,
  className,
  href,
  size = "small",
  fluid,
  isDark,
  startIcon, // only for icon button
  endIcon, // only for icon button
  shrinkTrans = true,
  loading,
  disabled,
  ...rest
}) => {
  const sm = size === "small";

  if (type === "primary")
    return (
      <button
        type="button"
        href={href}
        disabled={disabled}
        aria-disabled={disabled ? "true" : "false"}
        className={`flex items-center bg-primary hover:bg-opacity-90 text-white font-medium rounded shadow-md cursor-pointer select-none transition duration-150 ${
          sm ? "px-4 py-2 space-x-2" : "px-6 py-3 space-x-3"
        } ${shrinkTrans && "active:scale-95"} ${className}`}
        {...rest}
      >
        {loading && <Loader sm color="light" type={2} />}
        <span>{children}</span>
      </button>
    );

  if (type === "secondary")
    return (
      <a
        type="button"
        href={href}
        disabled={disabled}
        aria-disabled={disabled ? "true" : "false"}
        className={`flex items-center text-primaryText dark:text-primaryTextDark bg-primary bg-opacity-10 hover:bg-primary hover:text-white font-medium rounded shadow-md border-2 border-primary cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "px-3.5 py-1.5" : "px-5 py-2.5"} ${
          fluid && "min-w-full text-center"
        } ${className}`}
        {...rest}
      >
        <span>{children}</span>
      </a>
    );

  if (type === "text")
    return (
      <button
        type="button"
        href={href}
        disabled={disabled}
        aria-disabled={disabled ? "true" : "false"}
        className={`flex items-center text-primaryText dark:text-primaryTextDark hover:bg-primary hover:bg-opacity-10 hover:border-gray-400 rounded cursor-pointer transition duration-150 ${
          loading ? "bg-primary bg-opacity-10" : "bg-transparent"
        } ${shrinkTrans && "active:scale-95"} ${
          sm ? "py-2 px-3 space-x-2" : "px-5 py-2.5 space-x-3"
        } ${className}`}
        {...rest}
      >
        {loading && <Loader sm color="primary" type={2} />}
        <span>{children}</span>
      </button>
    );

  if (type === "icon")
    return (
      <button
        type="button"
        href={href}
        disabled={disabled}
        aria-disabled={disabled ? "true" : "false"}
        className={`flex items-center bg-primary text-white hover:bg-opacity-90 font-medium rounded shadow-md cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "py-2 px-3 space-x-2" : "px-5 py-2.5 space-x-3"} ${className}`}
        {...rest}
      >
        <span className="button-start-icon">
          {loading && startIcon ? (
            <Loader sm color="light" type={2} />
          ) : (
            startIcon
          )}
        </span>
        <span>{children}</span>
        <span className="button-end-icon">
          {loading && endIcon ? <Loader sm color="light" type={2} /> : endIcon}
        </span>
      </button>
    );

  if (type === "special-icon")
    return (
      <a
        href={href}
        disabled={disabled}
        aria-disabled={disabled ? "true" : "false"}
        className={`px-12 flex items-center justify-center rounded-md shadow font-medium py-3 border hover:bg-gray-50 cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${className}`}
        {...rest}
      >
        {loading ? <Loader sm color="primary" type={2} /> : children}
      </a>
    );

  if (type === "text-icon")
    return (
      <a
        href={href}
        disabled={disabled}
        aria-disabled={disabled ? "true" : "false"}
        className={`flex items-center space-x-3 text-primaryText dark:text-primaryTextDark bg-transparent hover:bg-primary hover:bg-opacity-10 font-medium rounded shadow-md cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "py-2 px-3 space-x-2" : "px-5 py-2.5 space-x-3"} ${className}`}
        {...rest}
      >
        <span className="button-start-icon">{startIcon}</span>
        <span>{children}</span>
        <span className="button-end-icon">{endIcon}</span>
      </a>
    );
};

export default Button;
