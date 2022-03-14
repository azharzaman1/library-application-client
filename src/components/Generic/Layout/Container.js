import { Container as MuiContainer } from "@mui/material";

const Container = ({ className, ...rest }) => {
  return (
    <MuiContainer
      className={`px-3 md:px-6 lg:px-16 ${className}`}
      {...rest}
    ></MuiContainer>
  );
};

export default Container;
