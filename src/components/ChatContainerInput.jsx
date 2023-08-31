import {
  Box,
  TextField,
  useTheme,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Send, AttachmentOutlined } from '@mui/icons-material';
import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function ChatContainerInput() {
  const theme = useTheme();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState('');

  const onChangeFileHandler = (e) => {
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  // console.log('file', file);
  // console.log('data', data);
  // console.log('currentUser', currentUser);

  const onSubmitHandler = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },

        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'AllChats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, 'AllChats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setFile('');
    setImage(null);
  };

  return (
    <Box>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <TextField
          fullWidth
          size='small'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Type Message..'
          variant='outlined'
          sx={{
            margin: '1rem 0',
            '& .MuiOutlinedInput-root': {
              borderRadius: 5,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {file && (
                  <Box sx={{ width: '32px', height: '32px', mr: 1 }}>
                    <img
                      src={file}
                      alt={file}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                )}
                <input
                  accept='image/*'
                  style={{ display: 'none' }}
                  id='upload-img-button'
                  type='file'
                  onChange={onChangeFileHandler}
                />
                <label htmlFor='upload-img-button'>
                  <IconButton variant='raised' component='span'>
                    <AttachmentOutlined />
                  </IconButton>
                </label>
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          sx={{ backgroundColor: '#EBECFF', ml: 1 }}
          onClick={onSubmitHandler}
        >
          <Send sx={{ color: theme.palette.secondary.alt }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ChatContainerInput;
