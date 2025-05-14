// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyBooks from './pages/MyBooks';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
