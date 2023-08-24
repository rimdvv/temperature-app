import { CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './scenes/dashboard/Dashboard';
import Timeline from './scenes/timeline/Timeline';
import Temperature from './scenes/temperature/Temperature';
import Medicine from './scenes/medicine/Medicine';
import TempForm from './scenes/form/TempForm';
import MedForm from './scenes/form/MedForm';
import Layout from './scenes/layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/theme';
import EditTempForm from './scenes/form/EditTempForm';
import EditMedForm from './scenes/form/EditMedForm';
import Signup from './scenes/member/Signup';
import Login from './scenes/member/Login';

function App() {
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
              {/* <Route path='/dashboard' element={<Dashboard />} /> */}
              <Route path='/timeline' element={<Timeline />} />
              {/* <Route path='/temperature' element={<Temperature />} /> */}
              <Route path='/temperature/new' element={<TempForm />} />
              <Route
                path='/temperature/update/:doc_id'
                element={<EditTempForm />}
              />
              {/* <Route path='/medicine' element={<Medicine />} /> */}
              <Route path='/medicine/new' element={<MedForm />} />
              <Route
                path='/medicine/update/:doc_id'
                element={<EditMedForm />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
