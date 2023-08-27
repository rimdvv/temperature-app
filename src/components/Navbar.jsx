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
import { async } from '@firebase/util';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleAddModalOpen = () => setAddModalOpen(!addModalOpen);

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
          {/* <Button onClick={handleAddModalOpen}>
            <AddCircleOutlineRounded
              sx={{
                fontSize: '32px',
                color: theme.palette.secondary.alt,
              }}
            />
          </Button> */}
          <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
              direction='down'
              ariaLabel='SpeedDial basic example'
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                '& .MuiSpeedDial-fab': {
                  backgroundColor: theme.palette.secondary.alt,
                },
              }}
              icon={<SpeedDialIcon />}
            >
              <SpeedDialAction icon={templogo} tooltipTitle='temperature' />
              <SpeedDialAction icon={medlogo} tooltipTitle='medicine' />
            </SpeedDial>
          </Box>

          {currentUser ? (
            <>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ ml: 1 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 28, height: 28 }} />
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

          <Modal open={addModalOpen} onClose={handleAddModalOpen}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                bgcolor: 'background.paper',
                borderRadius: '16px',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='flex-start'
                  onClick={() => {
                    setAddModalOpen(false);
                    navigate('/temperature/new');
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <img src={templogo} alt='templogo' />
                  <Typography
                    fontSize='14px'
                    fontWeight='medium'
                    marginLeft='2rem'
                  >
                    TEMPERATURE
                  </Typography>
                </Box>
                <Divider style={{ width: '100%' }} />
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='flex-start'
                  onClick={() => {
                    setAddModalOpen(false);
                    navigate('/medicine/new');
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <img src={medlogo} alt='medlogo' />
                  <Typography
                    fontSize='14px'
                    fontWeight='medium'
                    marginLeft='2rem'
                  >
                    MEDICINE
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
