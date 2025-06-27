import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EditPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ url: '', username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  // in useefect we can do async
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/passwords/${id}`, { withCredentials: true })
      .then(res => setFormData(res.data.data))
      .catch(err => console.log(err));
  }, [id]);

// res.data           // => { success: true, data: {...} }
// res.data.data      // => { email: "john@example.com", password: "encrypted" }
//

// useEffect(() => {
//   const fetchPassword = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/passwords/${id}`, {
//         withCredentials: true
//       });
//       setFormData(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchPassword(); // call the inner async function
// }, [id]);



  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/passwords/${id}`, formData, { withCredentials: true });
      alert("Updated successfully ⚡");
      navigate("/passwords");
    } catch (err) {
      alert("Update failed ❌ " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#0f0f0f] to-[#1f1f2e] flex items-center justify-center text-white">
      <div className="bg-[#1b1b2f] p-10 rounded-2xl shadow-lg max-w-md w-full border border-blue-700/30">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400 font-mono tracking-widest">
          EDIT YOUR SECRETS 🔏
        </h1>
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1">URL</label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. thorOdinson"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. thor@asgard.com"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-lg text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-blue-600 hover:from-blue-600 hover:to-yellow-500 text-black font-bold py-2 rounded-md transition-all duration-300"
          >
            UPDATE SECRET ⚒️
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPassword;
