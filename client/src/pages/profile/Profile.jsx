 

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import MainLayout from '../../layouts/MainLayout';
// import { useAuth } from '../../context/AuthContext';
// import axios from '../../services/axiosInstance';
// import { Link } from 'react-router-dom';
// import { Edit, User, Github, Linkedin, Link2 } from 'lucide-react';

// const Profile = () => {
//   const { user, token } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState('');
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchProfile = async () => {
//       try {
//         const { data } = await axios.get('/auth/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (isMounted) setProfile(data.user);
//       } catch (err) {
//         if (isMounted) setError('Failed to load profile.');
//       }
//     };

//     if (token) fetchProfile();

//     return () => {
//       isMounted = false;
//     };
//   }, [token]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const { data } = await axios.get(`/projects/user`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProjects(data.projects);
//       } catch (err) {
//         setError('Failed to load your projects.');
//       }
//     };

//     if (token) fetchProjects();
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith('socialLinks.')) {
//       const key = name.split('.')[1];
//       setProfile((prev) => ({
//         ...prev,
//         socialLinks: {
//           ...prev.socialLinks,
//           [key]: value,
//         },
//       }));
//     } else {
//       setProfile((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     try {
//       await axios.put('/auth/profile', profile, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert('Profile updated successfully');
//     } catch (err) {
//       alert('Failed to update profile');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <motion.div
//         className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900 dark:text-white rounded shadow"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//           <User size={24} /> Your Profile
//         </h2>

//         {error && <p className="text-red-600 mb-3">{error}</p>}

//         {profile && (
//           <motion.div
//             className="mb-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <div className="flex items-center gap-4">
//               <img
//                 src={profile.avatar?.url || '/default-avatar.png'}
//                 alt="avatar"
//                 className="w-16 h-16 rounded-full object-cover border dark:border-gray-700"
//               />
//               <div>
//                 <h3 className="text-lg font-semibold">{profile.username}</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Joined: {new Date(profile.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-lg">
//               <h4 className="text-md font-semibold">Edit Profile</h4>

//               <input
//                 type="text"
//                 name="username"
//                 value={profile.username}
//                 onChange={handleChange}
//                 placeholder="Username"
//                 required
//                 className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
//               />

//               <textarea
//                 name="bio"
//                 value={profile.bio || ''}
//                 onChange={handleChange}
//                 placeholder="Your bio..."
//                 rows={3}
//                 className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
//               />

//               <div className="flex items-center gap-2">
//                 <Github size={16} />
//                 <input
//                   type="url"
//                   name="socialLinks.github"
//                   value={profile.socialLinks?.github || ''}
//                   onChange={handleChange}
//                   placeholder="GitHub URL"
//                   className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <Linkedin size={16} />
//                 <input
//                   type="url"
//                   name="socialLinks.linkedin"
//                   value={profile.socialLinks?.linkedin || ''}
//                   onChange={handleChange}
//                   placeholder="LinkedIn URL"
//                   className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <Link2 size={16} />
//                 <input
//                   type="url"
//                   name="socialLinks.portfolio"
//                   value={profile.socialLinks?.portfolio || ''}
//                   onChange={handleChange}
//                   placeholder="Portfolio URL"
//                   className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded hover:brightness-110 transition"
//               >
//                 {updating ? 'Updating...' : 'Update Profile'}
//               </button>
//             </form>
//           </motion.div>
//         )}

//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-2">Your Projects</h3>
//           {projects.length === 0 ? (
//             <p className="text-gray-600 dark:text-gray-400">
//               You haven’t created any projects yet.
//             </p>
//           ) : (
//             <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
//               {projects.map((proj, index) => (
//                 <motion.div
//                   key={proj._id}
//                   className="border border-gray-300 dark:border-gray-700 p-4 rounded shadow-sm bg-white dark:bg-gray-800"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <h4 className="font-bold dark:text-white">{proj.title}</h4>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {proj.category}
//                   </p>
//                   <div className="mt-2 flex gap-3 text-sm text-blue-600 dark:text-blue-400">
//                     <Link
//                       to={`/projects/${proj._id}/edit`}
//                       className="flex items-center gap-1 hover:underline"
//                     >
//                       <Edit size={14} /> Edit
//                     </Link>
//                     <Link
//                       to={`/projects/${proj._id}`}
//                       className="flex items-center gap-1 hover:underline"
//                     >
//                       View
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </MainLayout>
//   );
// };

// export default Profile;



//  import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import MainLayout from '../../layouts/MainLayout';
// import { useAuth } from '../../context/AuthContext';
// import axios from '../../services/axiosInstance';
// import { Link } from 'react-router-dom';
// import { Edit, User, Github, Linkedin, Link2 } from 'lucide-react';

// const Profile = () => {
//   const { user, token } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState('');
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchProfile = async () => {
//       try {
//         const { data } = await axios.get('/auth/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (isMounted) setProfile(data.user);
//       } catch (err) {
//         if (isMounted) setError('Failed to load profile.');
//       }
//     };

//     if (token) fetchProfile();

//     return () => {
//       isMounted = false;
//     };
//   }, [token]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const { data } = await axios.get(`/projects/user`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProjects(data.projects);
//       } catch (err) {
//         setError('Failed to load your projects.');
//       }
//     };

//     if (token) fetchProjects();
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith('socialLinks.')) {
//       const key = name.split('.')[1];
//       setProfile((prev) => ({
//         ...prev,
//         socialLinks: {
//           ...prev.socialLinks,
//           [key]: value,
//         },
//       }));
//     } else {
//       setProfile((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     try {
//       await axios.put('/auth/profile', profile, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert('Profile updated successfully');
//     } catch (err) {
//       alert('Failed to update profile');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <motion.div
//         className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white rounded-2xl shadow-lg"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
//           <User size={26} className="text-blue-600" /> Your Profile
//         </h2>

//         {error && <p className="text-red-600 mb-3">{error}</p>}

//         {profile && (
//           <motion.div
//             className="mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             {/* Profile Header */}
//             <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
//               <img
//                 src={profile.avatar?.url || '/default-avatar.png'}
//                 alt="avatar"
//                 className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
//               />
//               <div>
//                 <h3 className="text-xl font-semibold">{profile.username}</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Joined: {new Date(profile.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>

//             {/* Edit Form */}
//             <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-lg">
//               <h4 className="text-lg font-semibold border-b pb-2 border-gray-200 dark:border-gray-700">
//                 Edit Profile
//               </h4>

//               <input
//                 type="text"
//                 name="username"
//                 value={profile.username}
//                 onChange={handleChange}
//                 placeholder="Username"
//                 required
//                 className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <textarea
//                 name="bio"
//                 value={profile.bio || ''}
//                 onChange={handleChange}
//                 placeholder="Your bio..."
//                 rows={3}
//                 className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <div className="flex items-center gap-2">
//                 <Github size={18} />
//                 <input
//                   type="url"
//                   name="socialLinks.github"
//                   value={profile.socialLinks?.github || ''}
//                   onChange={handleChange}
//                   placeholder="GitHub URL"
//                   className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <Linkedin size={18} />
//                 <input
//                   type="url"
//                   name="socialLinks.linkedin"
//                   value={profile.socialLinks?.linkedin || ''}
//                   onChange={handleChange}
//                   placeholder="LinkedIn URL"
//                   className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <Link2 size={18} />
//                 <input
//                   type="url"
//                   name="socialLinks.portfolio"
//                   value={profile.socialLinks?.portfolio || ''}
//                   onChange={handleChange}
//                   placeholder="Portfolio URL"
//                   className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-medium hover:brightness-110 transition-all duration-300"
//               >
//                 {updating ? 'Updating...' : 'Update Profile'}
//               </button>
//             </form>
//           </motion.div>
//         )}

//         {/* Projects */}
//         <div>
//           <h3 className="text-xl font-semibold mb-3">Your Projects</h3>
//           {projects.length === 0 ? (
//             <p className="text-gray-600 dark:text-gray-400">
//               You haven’t created any projects yet.
//             </p>
//           ) : (
//             <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
//               {projects.map((proj, index) => (
//                 <motion.div
//                   key={proj._id}
//                   className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all duration-200"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <h4 className="font-bold text-lg">{proj.title}</h4>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {proj.category}
//                   </p>
//                   <div className="mt-3 flex gap-4 text-sm text-blue-600 dark:text-blue-400">
//                     <Link
//                       to={`/projects/${proj._id}/edit`}
//                       className="flex items-center gap-1 hover:underline"
//                     >
//                       <Edit size={14} /> Edit
//                     </Link>
//                     <Link
//                       to={`/projects/${proj._id}`}
//                       className="flex items-center gap-1 hover:underline"
//                     >
//                       View
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </MainLayout>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../context/AuthContext';
import axios from '../../services/axiosInstance';
import { Link } from 'react-router-dom';
import { Edit, User, Github, Linkedin, Link2 } from 'lucide-react';

const Profile = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted) setProfile(data.user);
      } catch (err) {
        if (isMounted) setError('Failed to load profile.');
      }
    };

    if (token) fetchProfile();
    return () => { isMounted = false; };
  }, [token]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`/projects/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(data.projects);
      } catch (err) {
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
      <motion.div
        className="max-w-4xl mx-auto p-8 rounded-3xl shadow-xl bg-gradient-to-br from-purple-50 via-white to-pink-50 
                   dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          <User size={28} /> Your Profile
        </h2>

        {error && <p className="text-red-500 font-medium mb-3">{error}</p>}

        {profile && (
          <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {/* Profile Header */}
            <div className="flex items-center gap-5 bg-gradient-to-r from-indigo-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-2xl shadow-md">
              <img
                src={profile.avatar?.url || '/default-avatar.png'}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-pink-400 shadow-md"
              />
              <div>
                <h3 className="text-2xl font-bold">{profile.username}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Joined: {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5 max-w-lg">
              <h4 className="text-lg font-semibold border-b pb-2 border-gray-300 dark:border-gray-600">
                Edit Profile
              </h4>

              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-pink-400 outline-none"
              />

              <textarea
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                placeholder="Your bio..."
                rows={3}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-pink-400 outline-none"
              />

              {[
                { icon: Github, name: 'github', placeholder: 'GitHub URL' },
                { icon: Linkedin, name: 'linkedin', placeholder: 'LinkedIn URL' },
                { icon: Link2, name: 'portfolio', placeholder: 'Portfolio URL' },
              ].map(({ icon: Icon, name, placeholder }) => (
                <div key={name} className="flex items-center gap-2">
                  <Icon size={18} className="text-pink-500" />
                  <input
                    type="url"
                    name={`socialLinks.${name}`}
                    value={profile.socialLinks?.[name] || ''}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl 
                           font-medium shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
              >
                {updating ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Projects */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Projects</h3>
          {projects.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">You haven’t created any projects yet.</p>
          ) : (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
              {projects.map((proj, index) => (
                <motion.div
                  key={proj._id}
                  className="border border-gray-200 dark:border-gray-700 p-5 rounded-2xl shadow-md 
                             bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-700 
                             hover:shadow-lg hover:scale-[1.01] transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="font-bold text-lg">{proj.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{proj.category}</p>
                  <div className="mt-3 flex gap-4 text-sm text-purple-600 dark:text-pink-400">
                    <Link to={`/projects/${proj._id}/edit`} className="flex items-center gap-1 hover:underline">
                      <Edit size={14} /> Edit
                    </Link>
                    <Link to={`/projects/${proj._id}`} className="flex items-center gap-1 hover:underline">
                      View
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Profile;
