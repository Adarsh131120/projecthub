 


import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../context/AuthContext';
import axios from '../../services/axiosInstance';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';

const Profile = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  // 🔐 Fetch profile with isMounted flag
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted) setProfile(data.user);
      } catch (err) {
        console.error(err);
        if (isMounted) setError('Failed to load profile.');
      }
    };

    if (token) fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // 📦 Fetch user projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`/projects/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(data.projects);
      } catch (err) {
        console.error(err);
        setError('Failed to load your projects.');
      }
    };

    if (token) fetchProjects();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setProfile((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put('/auth/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900 dark:text-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        {profile && (
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar?.url || '/default-avatar.png'}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border dark:border-gray-700"
              />
              <div>
                <h3 className="text-lg font-semibold">{profile.username}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Joined: {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-lg">
              <h4 className="text-md font-semibold">Edit Profile</h4>

              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />

              <textarea
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                placeholder="Your bio..."
                rows={3}
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />

              <input
                type="url"
                name="socialLinks.github"
                value={profile.socialLinks?.github || ''}
                onChange={handleChange}
                placeholder="GitHub URL"
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
              <input
                type="url"
                name="socialLinks.linkedin"
                value={profile.socialLinks?.linkedin || ''}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
              <input
                type="url"
                name="socialLinks.portfolio"
                value={profile.socialLinks?.portfolio || ''}
                onChange={handleChange}
                placeholder="Portfolio URL"
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {updating ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Your Projects</h3>
          {projects.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              You haven’t created any projects yet.
            </p>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {projects.map((proj) => (
                <div
                  key={proj._id}
                  className="border border-gray-300 dark:border-gray-700 p-4 rounded shadow-sm bg-white dark:bg-gray-800"
                >
                  <h4 className="font-bold dark:text-white">{proj.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{proj.category}</p>
                  <div className="mt-2 flex gap-3 text-sm text-blue-600 dark:text-blue-400">
                    <Link
                      to={`/projects/${proj._id}/edit`}
                      className="flex items-center gap-1 hover:underline"
                    >
                      <Edit size={14} /> Edit
                    </Link>
                    <Link
                      to={`/projects/${proj._id}`}
                      className="flex items-center gap-1 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
