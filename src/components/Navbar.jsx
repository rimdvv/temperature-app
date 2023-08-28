import React, { useContext, useState } from 'react';
import {
  Menu as MenuIcon,
  AddCircleOutlineRounded,
  Logout,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  Box,
  IconButton,
  Toolbar,
  useTheme,
  Modal,
  Divider,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import templogo from '../assets/templogo.svg';
import medlogo from '../assets/medlogo.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{ transform: 'translateZ(0px)', flexGrow: 1, zIndex: 10000 }}
          >
            <SpeedDial
              direction='down'
              ariaLabel='SpeedDial basic example'
              sx={{
                position: 'absolute',
                top: -19,
                right: 15,
                '& .MuiSpeedDial-fab': {
                  backgroundColor: theme.palette.secondary.alt,
                },
                '& .MuiFab-primary': { width: 40, height: 40 },
              }}
              icon={<SpeedDialIcon sx={{ width: '24px', height: '24px' }} />}
            >
              <SpeedDialAction
                onClick={() => {
                  navigate('/temperature/new');
                }}
                icon={<img src={templogo} alt=' ' />}
                tooltipTitle='temperature'
              />
              <SpeedDialAction
                onClick={() => {
                  navigate('/medicine/new');
                }}
                icon={<img src={medlogo} alt=' ' />}
                tooltipTitle='medicine'
              />
            </SpeedDial>
          </Box>

          {currentUser ? (
            <>
              <IconButton
                onClick={handleClick}
                size='small'
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 36, height: 36 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => signOut(auth)}>
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
              <Typography color={theme.palette.neutral.main} fontWeight='bold'>
                Log in
              </Typography>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
