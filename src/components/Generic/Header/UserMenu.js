import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { palette } from "../../../theming/palette";
import useAuth from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import useLogout from "../../../hooks/useLogout";
import { selectUserType } from "../../../redux/slices/userSlice";
import useLogin from "../../../hooks/useLogin";

const UserMenu = () => {
  const currentUser = useAuth();
  const userType = useSelector(selectUserType);
  const logout = useLogout();
  const { loading, data, login } = useLogin();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSwitch = async (account) => {
    try {
      if (account === "Admin" && userType !== "Admin") {
        await login({ email: "admin@lib.com", pswd: "admin" });
      } else if (account === "Student" && userType !== "Student") {
        await login({ email: "student@lib.com", pswd: "student" });
      } else if (account === "User" && userType !== "User") {
        await login({ email: "user@lib.com", pswd: "user" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: palette.primary }}>
              {currentUser?.username?.split("")[0].toUpperCase() || "U"}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: "200px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="px-3 pt-2 pb-1">Switch account</div>
        <Divider className="py-1" />
        <MenuItem
          onClick={() => handleAccountSwitch("Admin")}
          sx={userType === "Admin" && { bgcolor: palette.backgroundColor1 }}
        >
          <Avatar sx={{ bgcolor: palette.primary }}>A</Avatar> @Admin
        </MenuItem>
        <MenuItem
          onClick={() => handleAccountSwitch("Student")}
          sx={userType === "Student" && { bgcolor: palette.backgroundColor1 }}
        >
          <Avatar sx={{ bgcolor: palette.primary }}>S</Avatar> @Student
        </MenuItem>
        <MenuItem
          onClick={() => handleAccountSwitch("User")}
          sx={userType === "User" && { bgcolor: palette.backgroundColor1 }}
        >
          <Avatar sx={{ bgcolor: palette.primary }}>U</Avatar> @User
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" className="rotate-180" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
export default UserMenu;
