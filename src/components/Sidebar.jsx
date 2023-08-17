import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ThermostatOutlined,
  ViewTimelineOutlined,
  MedicationOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Insights",
    icon: null,
  },
  {
    text: "Timeline",
    icon: <ViewTimelineOutlined />,
  },
  {
    text: "Temperature",
    icon: <ThermostatOutlined />,
  },
  {
    text: "Medicine",
    icon: <MedicationOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.background.default,
              boxSixing: "border-box",
              width: drawerWidth,
              boxShadow: 3,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 2rem">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                color={theme.palette.primary.main}
              >
                <Box display="flex" alignItems="center">
                  <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    Tempo
                  </Typography>
                  <img src={logo} alt="logo" />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft sx={{ ml: "2rem" }} />
                  </IconButton>
                )}
              </Box>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      variant="h5"
                      color={theme.palette.neutral.main}
                      key={text}
                      sx={{ m: "2rem 0 1rem 2rem" }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.background.alt
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.neutral.main
                            : theme.palette.primary.main,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem",
                          color:
                            active === lcText
                              ? theme.palette.neutral.main
                              : theme.palette.primary.main,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
