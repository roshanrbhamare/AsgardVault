import { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Home = () => {
  const [formData, setFormData] = useState({
    url: '',
    username: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/password/save`, formData, {
        withCredentials: true
      });
      alert("Password saved ⚡");
      setFormData({ url: '', username: '', email: '', password: '' });
    } catch (err) {
      alert("Error saving password: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className=" min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#0f0f0f] to-[#1f1f2e] flex items-center justify-center text-white">
      <div className="bg-[#1b1b2f] p-10 rounded-2xl shadow-lg max-w-md w-full border border-blue-700/30">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400 font-mono tracking-widest">
          SAVE YOUR LEGENDARY LOGIN
        </h1>
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1">URL</label>
            <input
              type="text"
              placeholder="e.g. https://asgard.com"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="e.g. thor123"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="thor@asgard.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-xl text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-yellow-400 hover:from-yellow-400 hover:to-blue-600 text-black font-bold py-2 rounded-md transition-all duration-300"
          >
            SAVE TO THE VAULT 🔐
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
