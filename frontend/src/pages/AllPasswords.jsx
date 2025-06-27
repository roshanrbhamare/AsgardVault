import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';

const AllPasswords = () => {
  const [passwords, setPasswords] = useState([]);
  const [showPasswordMap, setShowPasswordMap] = useState({}); // track visibility per item

  const fetchPasswords = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/passwords`, { withCredentials: true });
      setPasswords(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const togglePasswordVisibility = (id) => {
    setShowPasswordMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this password?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/passwords/${id}`, { withCredentials: true });
      alert("Deleted successfully ⚔️");
      fetchPasswords(); // refresh list after delete
    } catch (err) {
      alert("Failed to delete ❌ " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#0f0f0f] to-[#1f1f2e] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8 tracking-widest">
          YOUR SAVED VAULT 🔐
        </h1>

        {passwords.length === 0 ? (
          <p className="text-center text-gray-400">No passwords saved yet...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {passwords.map((p) => (
              <div
                key={p._id}
                className="bg-[#1b1b2f] rounded-xl border border-blue-700/40 p-6 shadow-md hover:shadow-lg transition duration-300"
              >
                <p className="mb-2">
                  <span className="text-gray-400">🔗 URL:</span>{' '}
                  <span className="text-blue-400 break-words">{p.url}</span>
                </p>
                <p className="mb-2">
                  <span className="text-gray-400">👤 Username:</span>{' '}
                  <span className="text-white">{p.username || '—'}</span>
                </p>
                <p className="mb-2">
                  <span className="text-gray-400">📧 Email:</span>{' '}
                  <span className="text-white">{p.email || '—'}</span>
                </p>

                <div className="mb-2 flex items-center gap-2">
                  <span className="text-gray-400">🔒 Password:</span>
                  <span className="text-white">
                    {showPasswordMap[p._id] ? p.password : '••••••••'}
                  </span>
                  <button
                    onClick={() => togglePasswordVisibility(p._id)}
                    className="text-lg text-gray-400 hover:text-white"
                  >
                    {showPasswordMap[p._id] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/passwords/edit/${p._id}`}
                    className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-red-600 to-blue-600 hover:from-blue-600 hover:to-red-600 text-white rounded-md font-semibold transition-all"
                  >
                    ✏️ Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-800 to-red-600 hover:from-red-600 hover:to-red-800 text-white rounded-md font-semibold transition-all"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPasswords;
