import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaSignOutAlt, FaUserShield } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
      alert("Logged out successfully ⚡");
      navigate("/login");
    } catch (err) {
      alert("Logout failed ❌ " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e1c] border-b border-[#ff79c6] px-6 py-4 shadow-lg flex justify-between items-center h-16 font-mono">

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FaLock className="text-[#ff79c6] text-2xl" />
        <h1 className="text-[#ff79c6] font-bold text-xl md:text-2xl tracking-wider">
          ⚡ AsgardVault ⚡
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4 md:space-x-6 text-sm md:text-base">
        <Link to="/home" className="hover:text-[#ffb3d9] text-[#d6d6f5] transition-all duration-200">🏠 Home</Link>
        <Link to="/passwords" className="hover:text-[#ffb3d9] text-[#d6d6f5] transition-all duration-200">🔐 Vault</Link>
        <Link to="/profile" className="hover:text-[#ffb3d9] text-[#d6d6f5] transition-all duration-200 flex items-center gap-1">
          <FaUserShield className="text-sm" /> Profile
        </Link>
        <button
          onClick={handleLogout}
          className="hover:text-pink-400 text-[#d6d6f5] transition-all duration-200 flex items-center gap-1 focus:outline-none"
        >
          <FaSignOutAlt className="text-sm" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
