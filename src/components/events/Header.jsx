import { Typography } from "@material-tailwind/react";

const Header = (props) => {
  return (
    <Typography variant="h1" color="white">
      {props.title}
    </Typography>
  );
};
export default Header;
