import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/signup`, { email, password }, { withCredentials: true });
      alert("Signup successful ⚡");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1f1f2e] flex items-center justify-center text-white">
      <div className="bg-[#1b1b2f] p-10 rounded-2xl shadow-lg max-w-md w-full border border-blue-700/30">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500 font-mono tracking-widest">
          THOR'S VAULT
        </h1>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your thundermail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Your Mjolnir key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 text-xl text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 text-white font-bold py-2 rounded-md transition-all duration-300"
          >
            WIELD THE POWER
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Already chosen by Odin?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
