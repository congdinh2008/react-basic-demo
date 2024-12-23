import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomerLayout from './shared/layouts/CustomerLayout';
import ManagerLayout from './shared/layouts/ManagerLayout';
import AdminDashboard from './pages/manager/AdminDashboard';
import AmenityList from './pages/manager/amenity/AmenityList';
import RoomList from './pages/manager/room/RoomList';
import Login from './pages/auth/Login';
import AnonymousLayout from './shared/layouts/AnonymousLayout';
import Register from './pages/auth/Register';
import { AuthProvider } from './contexts/auth.context';
import PrivateRoute from './shared/components/PrivateRoute';
import AnonymousRoute from './shared/components/AnonymousRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="main-content min-h-screen flex flex-col">
          <Routes>
            {/* Customer Router */}
            <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
            <Route path="/about" element={<CustomerLayout><About /></CustomerLayout>} />
            <Route path="/contact" element={<CustomerLayout><Contact /></CustomerLayout>} />

            {/* Admin Router */}
            <Route element={<PrivateRoute />} >
              <Route path="/manager/dashboard" element={<ManagerLayout><AdminDashboard /></ManagerLayout>} />
              <Route path="/manager/amenities" element={<ManagerLayout><AmenityList /></ManagerLayout>} />
              <Route path="/manager/rooms" element={<ManagerLayout><RoomList /></ManagerLayout>} />
            </Route>

            {/* Auth Router */}
            <Route element={<AnonymousRoute />} >
              <Route path="/auth/login" element={<AnonymousLayout><Login /></AnonymousLayout>} />
              <Route path="/auth/register" element={<AnonymousLayout><Register /></AnonymousLayout>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
