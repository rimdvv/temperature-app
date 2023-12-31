import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRightOutlined,
  SmsOutlined,
  ViewTimelineOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const navItems = [
  // {
  //   text: 'Dashboard',
  //   icon: <HomeOutlined />,
  // },
  {
    text: 'Timeline',
    icon: <ViewTimelineOutlined />,
  },
  {
    text: 'Chat',
    icon: <SmsOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component='nav'>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.primary.main,
              backgroundColor: '#F9F9F9',
              boxSixing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box width='100%'>
            <Box m='1.5rem 2rem 2rem 2rem'>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                color={theme.palette.primary.main}
              >
                <Box
                  display='flex'
                  alignItems='center'
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                >
                  <Typography
                    variant='h2'
                    sx={{ fontWeight: 'bold', marginRight: '0.5rem' }}
                  >
                    Tempo
                  </Typography>
                  <img src={logo} alt='logo' />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft sx={{ ml: '8px' }} />
                  </IconButton>
                )}
              </Box>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                        setIsSidebarOpen(!isSidebarOpen);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText ? '#EDEDED' : 'transparent',
                        color:
                          active === lcText
                            ? theme.palette.primary.main
                            : theme.palette.neutral.main,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '1rem',
                          color:
                            active === lcText
                              ? theme.palette.primary.main
                              : theme.palette.neutral.main,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{
                          '.MuiListItemText-primary': { fontWeight: 'bold' },
                        }}
                      />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
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
