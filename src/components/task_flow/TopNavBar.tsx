import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { RxDashboard } from "react-icons/rx";
import TaskCreateModal from "./TaskCreateModal";
import { Chip, Stack } from "@mui/material";

export default function TopNavBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        sx={{
          boxShadow: 0,
          borderBottom: "1px solid #d4d3d3",
          background: "#6258f1",
          height: 80,
          justifyContent: "center",
          paddingX: 20,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block", color: "#ffffff" },
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            TaskFlow
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            color={"#ffffff"}
            gap={2}
          >
            <Chip
              sx={{
                color: "#ffffff",
                cursor: "pointer",
                "&:hover": { background: "#e2e2e22c" },
                "&:active": { background: "#e2e2e210" },
                paddingX: 1,
                background: props.value == 1 ? "#b3d6ff6b" : "",
              }}
              icon={<RxDashboard color="#ffffff" size={20} />}
              onClick={() => {
                props.handleChange(1);
                props.setStatus("tudo");
              }}
              label="Overview"
            />
            <Chip
              sx={{
                color: "#ffffff",
                cursor: "pointer",
                "&:hover": { background: "#e2e2e22c" },
                "&:active": { background: "#e2e2e210" },
                paddingX: 1,
                background: props.value == 2 ? "#b3d6ff6b" : "",
              }}
              onClick={() => {
                props.handleChange(2);
                props.setStatus("initialized");
              }}
              label="Em desenvolvimento"
            />
            <Chip
              sx={{
                color: "#ffffff",
                cursor: "pointer",
                "&:hover": { background: "#e2e2e22c" },
                "&:active": { background: "#e2e2e210" },
                paddingX: 1,
                background: props.value == 3 ? "#b3d6ff6b" : "",
              }}
              label="Em espera"
              onClick={() => {
                props.handleChange(3);
                props.setStatus("standby");
              }}
            />
            <Chip
              sx={{
                color: "#ffffff",
                cursor: "pointer",
                "&:hover": { background: "#e2e2e22c" },
                "&:active": { background: "#e2e2e210" },
                paddingX: 1,
                background: props.value == 4 ? "#b3d6ff6b" : "",
              }}
              label="Concluído"
              onClick={() => {
                props.handleChange(4);
                props.setStatus("done");
              }}
            />
          </Stack>

          <Stack direction={"row"} alignItems={"center"}>
            <TaskCreateModal />
            <Stack direction={"row"} alignItems={"center"} gap={1.5}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Typography>João Augusto da Costa</Typography>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
