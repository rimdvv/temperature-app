import React, { useState } from 'react';
import {
  Box,
  useTheme,
  Modal,
  Divider,
  Typography,
  SpeedDialIcon,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function CreateChat() {
  const { currentUser } = useContext(AuthContext);

  const theme = useTheme();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleAddModalOpen = () => setAddModalOpen(!addModalOpen);

  const [search, setSearch] = useState('');
  const [searchRes, setSearchRes] = useState(null);

  const fetchSearchData = async () => {
    setSearch('');
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('displayName', '==', search));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchRes(doc.data());
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = async () => {
    setAddModalOpen(false);
    const combinedId =
      currentUser.uid > searchRes.uid
        ? currentUser.uid + searchRes.uid
        : searchRes.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'AllChats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'AllChats', combinedId), {
          messages: [],
        });
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: searchRes.uid,
            displayName: searchRes.displayName,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', searchRes.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setSearchRes('');
  };

  return (
    <Box m='0 1rem'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='flex-start'
        marginBottom='1rem'
      >
        <Typography variant='h4' fontWeight='bold'>
          Chats
        </Typography>
      </Box>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        onClick={handleAddModalOpen}
        sx={{
          backgroundColor: '#EBECFF',
          borderRadius: '10px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
      >
        <SpeedDialIcon
          sx={{
            color: theme.palette.secondary.alt,
          }}
        />
        <Typography
          sx={{
            color: theme.palette.secondary.alt,
            ml: 1,
            fontWeight: 'medium',
            fontSize: '15px',
          }}
        >
          Start A New Chat
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
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h4' fontWeight='bold' sx={{ mb: '1rem' }}>
              Search User
            </Typography>
            <TextField
              size='small'
              placeholder='Type in username'
              variant='outlined'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                e.key === 'Enter' && fetchSearchData();
              }}
              sx={{ mb: '1rem' }}
            />
            <Divider style={{ width: '100%' }} />
            {searchRes ? (
              <List>
                <ListItem onClick={handleSelect}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 36, height: 36 }} />
                  </ListItemAvatar>
                  <ListItemText primary={searchRes.displayName} />
                </ListItem>
              </List>
            ) : (
              <Box
                mt='1rem'
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <Typography sx={{ color: theme.palette.neutral.main }}>
                  No user found
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default CreateChat;
