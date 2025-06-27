// Frontend: Profile.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/profile`, { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        setFormData({ email: res.data.user.email });
      })
      .catch(err => console.log(err));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/profile`, formData, { withCredentials: true });
      alert("Profile updated successfully");
      setEditMode(false);
      setUser(prev => ({ ...prev, email: formData.email }));
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      alert("Logout failed"+err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#0f0f0f] to-[#1f1f2e] text-white flex items-center justify-center p-6">
      <div className="bg-[#1b1b2f] border border-yellow-400/30 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl text-yellow-400 font-bold text-center mb-6 tracking-widest">
          ⚡ USER'S PROFILE ⚡
        </h1>

        {user ? (
          <>
            {editMode ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ email: e.target.value })}
                    className="w-full px-4 py-2 rounded-md bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md transition-all"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <p>
                  <span className="text-gray-400">📧 Email:</span>
                  <span className="ml-2 text-white">{user.email}</span>
                </p>
                <p>
                  <span className="text-gray-400">🆔 User ID:</span>
                  <span className="ml-2 text-blue-400 break-words">{user._id}</span>
                </p>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
