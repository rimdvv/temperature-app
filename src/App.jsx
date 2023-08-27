import React, { useContext } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Timeline from './scenes/timeline/Timeline';
import TempForm from './scenes/form/TempForm';
import MedForm from './scenes/form/MedForm';
import Layout from './scenes/layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/theme';
import EditTempForm from './scenes/form/EditTempForm';
import EditMedForm from './scenes/form/EditMedForm';
import Signup from './scenes/member/Signup';
import Login from './scenes/member/Login';
import Chat from './scenes/chat/Chat';
import { AuthContext } from './context/AuthContext';

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />;
    }
    return children;
  };

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to='/timeline' replace />} />
              <Route path='/timeline' element={<Timeline />} />
              <Route path='/temperature/new' element={<TempForm />} />
              <Route
                path='/temperature/update/:doc_id'
                element={<EditTempForm />}
              />
              <Route path='/medicine/new' element={<MedForm />} />
              <Route
                path='/medicine/update/:doc_id'
                element={<EditMedForm />}
              />
              <Route
                path='/chat'
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
