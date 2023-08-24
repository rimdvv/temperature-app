import React, { useState } from 'react';
import { Menu as MenuIcon, AddCircleOutlineRounded } from '@mui/icons-material';
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
} from '@mui/material';
import templogo from '../assets/templogo.svg';
import medlogo from '../assets/medlogo.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleAddModalOpen = () => setAddModalOpen(!addModalOpen);

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
          <Button onClick={handleAddModalOpen}>
            <AddCircleOutlineRounded
              sx={{
                fontSize: '32px',
                color: theme.palette.secondary.alt,
              }}
            />
          </Button>
          <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
            <Typography color={theme.palette.neutral.main} fontWeight='bold'>
              Log in
            </Typography>
          </Box>
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
