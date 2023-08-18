import React, { useState } from "react";
import {
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  AccountCircleRounded,
  AddCircleOutline,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  Modal,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleAddModalOpen = () => setAddModalOpen(!addModalOpen);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handleAddModalOpen}>
            <AddCircleOutline sx={{ fontSize: "24px" }} />
          </Button>
          <Modal open={addModalOpen} onClose={handleAddModalOpen}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: "background.paper",
                borderRadius: "16px",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => {
                    setAddModalOpen(false);
                    navigate("/temperature/new");
                  }}
                >
                  Add Temperature
                </Button>
                <Divider style={{ width: "100%" }} />
                <Button
                  onClick={() => {
                    setAddModalOpen(false);
                    navigate("/medicine/new");
                  }}
                >
                  Add Medicine
                </Button>
              </Box>
            </Box>
          </Modal>
          <Button
            onClick={handleClick}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              gap: "1rem",
            }}
          >
            <AccountCircleRounded />
            <ArrowDropDownOutlined
              sx={{ color: theme.palette.neutral.main, fontSize: "25px" }}
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem onClick={handleClose}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
