
import './App.css';
import Registration from './component/Registration';
import Login from './component/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Dashboard from './component/Dashboard';
import StudentAdmin from './component/StudentAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Registration />} />
        </Route>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/studentAdmin' element={<StudentAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
