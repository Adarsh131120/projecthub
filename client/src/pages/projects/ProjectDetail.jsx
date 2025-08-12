// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from '../../services/axiosInstance';
// import { useAuth } from '../../context/AuthContext';
// import MainLayout from '../../layouts/MainLayout';
// import { ThumbsUp, ExternalLink, Github, Edit, Trash2 } from 'lucide-react';

// const ProjectDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [project, setProject] = useState(null);
//   const [error, setError] = useState('');
//   const [liking, setLiking] = useState(false);

//   const fetchProject = async () => {
//     try {
//       const { data } = await axios.get(`/projects/${id}`);
//       setProject(data.project);
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Failed to fetch project');
//     }
//   };

//   const handleLikeToggle = async () => {
//     if (!user) return;
//     setLiking(true);
//     try {
//       const res = await axios.patch(`/projects/${id}/like`);
//       setProject((prev) => ({
//         ...prev,
//         likes: res.data.isLiked
//           ? [...prev.likes, { user: user._id }]
//           : prev.likes.filter((l) => l.user !== user._id),
//       }));
//     } catch (err) {
//       console.error('Like failed');
//     } finally {
//       setLiking(false);
//     }
//   };

//   const handleStatusChange = async (e) => {
//     const newStatus = e.target.value;
//     try {
//       const { data } = await axios.patch(`/projects/${id}/status`, { status: newStatus });
//       setProject((prev) => ({ ...prev, status: data.status }));
//     } catch (err) {
//       alert('Failed to update status');
//     }
//   };

//   const handleDelete = async () => {
//     const confirmed = window.confirm('Are you sure you want to delete this project?');
//     if (!confirmed) return;

//     try {
//       await axios.delete(`/projects/${id}`);
//       alert('Project deleted successfully');
//       navigate('/');
//     } catch (err) {
//       alert('Failed to delete project');
//     }
//   };

//   useEffect(() => {
//     fetchProject();
//   }, [id]);

//   if (error) {
//     return (
//       <MainLayout>
//         <p className="text-center text-red-600 dark:text-red-400">{error}</p>
//       </MainLayout>
//     );
//   }

//   if (!project) {
//     return (
//       <MainLayout>
//         <p className="text-center text-gray-600 dark:text-gray-300">Loading project...</p>
//       </MainLayout>
//     );
//   }

//   const isLiked = user && project.likes.some((l) => l.user === user._id);
//   const isOwner = user && user._id === project.author._id;

//   return (
//     <MainLayout>
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 dark:text-white p-6 rounded shadow">
//         <div className="flex justify-between items-center mb-2">
//           <h1 className="text-2xl font-bold">{project.title}</h1>
//           {isOwner && (
//             <div className="flex gap-3">
//               <Link to={`/projects/${id}/edit`} className="text-blue-600 flex items-center gap-1 hover:underline">
//                 <Edit size={16} /> Edit
//               </Link>
//               <button
//                 onClick={handleDelete}
//                 className="text-red-600 flex items-center gap-1 hover:underline"
//               >
//                 <Trash2 size={16} /> Delete
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4">
//           <span>Category: {project.category}</span>
//           {isOwner ? (
//             <select
//               value={project.status}
//               onChange={handleStatusChange}
//               className="text-sm border p-1 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
//             >
//               <option>In Progress</option>
//               <option>Completed</option>
//               <option>On Hold</option>
//             </select>
//           ) : (
//             <span>Status: {project.status}</span>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {project.technologies.map((tech, idx) => (
//             <span
//               key={idx}
//               className="bg-gray-200 dark:bg-gray-700 dark:text-gray-100 px-2 py-0.5 rounded text-sm"
//             >
//               {tech}
//             </span>
//           ))}
//         </div>

//         {project.images.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//             {project.images.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img.url}
//                 alt={`Project Image ${idx + 1}`}
//                 className="rounded shadow border dark:border-gray-700"
//               />
//             ))}
//           </div>
//         )}

//         <p className="mb-4 whitespace-pre-wrap">{project.description}</p>

//         <div className="flex gap-4 mb-6">
//           {project.liveUrl && (
//             <a
//               href={project.liveUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-green-600 flex items-center gap-1 hover:underline"
//             >
//               <ExternalLink size={16} /> Live Site
//             </a>
//           )}
//           {project.githubUrl && (
//             <a
//               href={project.githubUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-700 dark:text-gray-300 flex items-center gap-1 hover:underline"
//             >
//               <Github size={16} /> GitHub
//             </a>
//           )}
//         </div>

//         <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleLikeToggle}
//               disabled={!user || liking}
//               className={`flex items-center gap-1 transition ${
//                 isLiked ? 'text-blue-600' : ''
//               } hover:text-blue-600`}
//             >
//               <ThumbsUp size={16} />
//               {project.likes.length}
//             </button>
//             <span>Views: {project.views}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <img
//               src={project.author.avatar?.url || '/default-avatar.png'}
//               alt="avatar"
//               className="w-6 h-6 rounded-full"
//             />
//             <span>{project.author.username}</span>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ProjectDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from '../../services/axiosInstance';
// import { useAuth } from '../../context/AuthContext';
// import MainLayout from '../../layouts/MainLayout';
// import {
//   ThumbsUp,
//   ExternalLink,
//   Github,
//   Edit,
//   Trash2,
// } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ProjectDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [project, setProject] = useState(null);
//   const [error, setError] = useState('');
//   const [liking, setLiking] = useState(false);

//   const fetchProject = async () => {
//     try {
//       const { data } = await axios.get(`/projects/${id}`);
//       setProject(data.project);
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Failed to fetch project');
//     }
//   };

//   const handleLikeToggle = async () => {
//     if (!user) return;
//     setLiking(true);
//     try {
//       const res = await axios.patch(`/projects/${id}/like`);
//       setProject((prev) => ({
//         ...prev,
//         likes: res.data.isLiked
//           ? [...prev.likes, { user: user._id }]
//           : prev.likes.filter((l) => l.user !== user._id),
//       }));
//     } catch (err) {
//       console.error('Like failed');
//     } finally {
//       setLiking(false);
//     }
//   };

//   const handleStatusChange = async (e) => {
//     const newStatus = e.target.value;
//     try {
//       const { data } = await axios.patch(`/projects/${id}/status`, { status: newStatus });
//       setProject((prev) => ({ ...prev, status: data.status }));
//     } catch (err) {
//       alert('Failed to update status');
//     }
//   };

//   const handleDelete = async () => {
//     const confirmed = window.confirm('Are you sure you want to delete this project?');
//     if (!confirmed) return;

//     try {
//       await axios.delete(`/projects/${id}`);
//       alert('Project deleted successfully');
//       navigate('/');
//     } catch (err) {
//       alert('Failed to delete project');
//     }
//   };

//   useEffect(() => {
//     fetchProject();
//   }, [id]);

//   if (error) {
//     return (
//       <MainLayout>
//         <p className="text-center text-red-600 dark:text-red-400">{error}</p>
//       </MainLayout>
//     );
//   }

//   if (!project) {
//     return (
//       <MainLayout>
//         <p className="text-center text-gray-600 dark:text-gray-300">Loading project...</p>
//       </MainLayout>
//     );
//   }

//   const isLiked = user && project.likes.some((l) => l.user === user._id);
//   const isOwner = user && user._id === project.author._id;

//   return (
//     <MainLayout>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-4xl mx-auto bg-white dark:bg-gray-900 dark:text-white p-6 rounded-2xl shadow-md border dark:border-gray-800"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
//           {isOwner && (
//             <div className="flex gap-4">
//               <Link to={`/projects/${id}/edit`} className="text-blue-600 flex items-center gap-1 hover:underline">
//                 <Edit size={18} /> Edit
//               </Link>
//               <button
//                 onClick={handleDelete}
//                 className="text-red-600 flex items-center gap-1 hover:underline"
//               >
//                 <Trash2 size={18} /> Delete
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="mb-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4">
//           <span>Category: {project.category}</span>
//           {isOwner ? (
//             <select
//               value={project.status}
//               onChange={handleStatusChange}
//               className="text-sm border p-1 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
//             >
//               <option>In Progress</option>
//               <option>Completed</option>
//               <option>On Hold</option>
//             </select>
//           ) : (
//             <span>Status: {project.status}</span>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-2 mb-5">
//           {project.technologies.map((tech, idx) => (
//             <span
//               key={idx}
//               className="bg-gray-200 dark:bg-gray-700 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-medium shadow"
//             >
//               {tech}
//             </span>
//           ))}
//         </div>

//         {project.images.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
//           >
//             {project.images.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img.url}
//                 alt={`Project Image ${idx + 1}`}
//                 className="rounded-xl shadow-md border dark:border-gray-700"
//               />
//             ))}
//           </motion.div>
//         )}

//         <p className="mb-6 whitespace-pre-wrap leading-relaxed">{project.description}</p>

//         <div className="flex gap-4 mb-6">
//           {project.liveUrl && (
//             <a
//               href={project.liveUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-green-600 flex items-center gap-1 hover:underline"
//             >
//               <ExternalLink size={18} /> Live Site
//             </a>
//           )}
//           {project.githubUrl && (
//             <a
//               href={project.githubUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-700 dark:text-gray-300 flex items-center gap-1 hover:underline"
//             >
//               <Github size={18} /> GitHub
//             </a>
//           )}
//         </div>

//         <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={handleLikeToggle}
//               disabled={!user || liking}
//               className={`flex items-center gap-1 transition ${
//                 isLiked ? 'text-blue-600' : ''
//               } hover:text-blue-600`}
//             >
//               <ThumbsUp size={18} />
//               {project.likes.length}
//             </button>
//             <span>Views: {project.views}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <img
//               src={project.author.avatar?.url || '/default-avatar.png'}
//               alt="avatar"
//               className="w-7 h-7 rounded-full object-cover border dark:border-gray-600"
//             />
//             <span className="font-medium">{project.author.username}</span>
//           </div>
//         </div>
//       </motion.div>
//     </MainLayout>
//   );
// };

// export default ProjectDetail;


// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from '../../services/axiosInstance';
// import { useAuth } from '../../context/AuthContext';
// import MainLayout from '../../layouts/MainLayout';
// import {
//   ThumbsUp,
//   ExternalLink,
//   Github,
//   Edit,
//   Trash2,
// } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ProjectDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [project, setProject] = useState(null);
//   const [error, setError] = useState('');
//   const [liking, setLiking] = useState(false);

//   const fetchProject = async () => {
//     try {
//       const { data } = await axios.get(`/projects/${id}`);
//       setProject(data.project);
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Failed to fetch project');
//     }
//   };

//   const handleLikeToggle = async () => {
//     if (!user) return;
//     setLiking(true);
//     try {
//       const res = await axios.patch(`/projects/${id}/like`);
//       setProject((prev) => ({
//         ...prev,
//         likes: res.data.isLiked
//           ? [...prev.likes, { user: user._id }]
//           : prev.likes.filter((l) => l.user !== user._id),
//       }));
//     } catch (err) {
//       console.error('Like failed');
//     } finally {
//       setLiking(false);
//     }
//   };

//   const handleStatusChange = async (e) => {
//     const newStatus = e.target.value;
//     try {
//       const { data } = await axios.patch(`/projects/${id}/status`, { status: newStatus });
//       setProject((prev) => ({ ...prev, status: data.status }));
//     } catch (err) {
//       alert('Failed to update status');
//     }
//   };

//   const handleDelete = async () => {
//     const confirmed = window.confirm('Are you sure you want to delete this project?');
//     if (!confirmed) return;

//     try {
//       await axios.delete(`/projects/${id}`);
//       alert('Project deleted successfully');
//       navigate('/');
//     } catch (err) {
//       alert('Failed to delete project');
//     }
//   };

//   useEffect(() => {
//     fetchProject();
//   }, [id]);

//   if (error) {
//     return (
//       <MainLayout>
//         <p className="text-center text-red-600 dark:text-red-400">{error}</p>
//       </MainLayout>
//     );
//   }

//   if (!project) {
//     return (
//       <MainLayout>
//         <p className="text-center text-gray-600 dark:text-gray-300">Loading project...</p>
//       </MainLayout>
//     );
//   }

//   const isLiked = user && project.likes.some((l) => l.user === user._id);
//   const isOwner = user && user._id === project.author._id;

//   return (
//     <MainLayout>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="max-w-5xl mx-auto bg-white dark:bg-gray-900 dark:text-white p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800"
//       >
//         {/* Title + Owner Controls */}
//         <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
//           <h1 className="text-4xl font-extrabold tracking-tight leading-snug">{project.title}</h1>
//           {isOwner && (
//             <div className="flex gap-3">
//               <Link
//                 to={`/projects/${id}/edit`}
//                 className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
//               >
//                 <Edit size={18} /> Edit
//               </Link>
//               <button
//                 onClick={handleDelete}
//                 className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
//               >
//                 <Trash2 size={18} /> Delete
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Category + Status */}
//         <div className="mb-5 text-sm flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
//           <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">{project.category}</span>
//           {isOwner ? (
//             <select
//               value={project.status}
//               onChange={handleStatusChange}
//               className="text-sm border px-3 py-1 rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-400"
//             >
//               <option>In Progress</option>
//               <option>Completed</option>
//               <option>On Hold</option>
//             </select>
//           ) : (
//             <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
//               {project.status}
//             </span>
//           )}
//         </div>

//         {/* Tech Stack */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {project.technologies.map((tech, idx) => (
//             <span
//               key={idx}
//               className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md"
//             >
//               {tech}
//             </span>
//           ))}
//         </div>

//         {/* Images */}
//         {project.images.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
//           >
//             {project.images.map((img, idx) => (
//               <motion.img
//                 whileHover={{ scale: 1.03 }}
//                 key={idx}
//                 src={img.url}
//                 alt={`Project Image ${idx + 1}`}
//                 className="rounded-xl shadow-lg border dark:border-gray-700 object-cover"
//               />
//             ))}
//           </motion.div>
//         )}

//         {/* Description */}
//         <p className="mb-8 whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-200">
//           {project.description}
//         </p>

//         {/* Links */}
//         <div className="flex flex-wrap gap-4 mb-8">
//           {project.liveUrl && (
//             <a
//               href={project.liveUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
//             >
//               <ExternalLink size={18} /> Live Site
//             </a>
//           )}
//           {project.githubUrl && (
//             <a
//               href={project.githubUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
//             >
//               <Github size={18} /> GitHub
//             </a>
//           )}
//         </div>

//         {/* Footer: Likes, Views, Author */}
//         <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t pt-4">
//           <div className="flex items-center gap-5">
//             <button
//               onClick={handleLikeToggle}
//               disabled={!user || liking}
//               className={`flex items-center gap-1 px-3 py-1 rounded-lg border transition ${
//                 isLiked
//                   ? 'bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900 dark:text-blue-300'
//                   : 'hover:bg-blue-50 dark:hover:bg-gray-800'
//               }`}
//             >
//               <ThumbsUp size={18} />
//               {project.likes.length}
//             </button>
//             <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">Views: {project.views}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <img
//               src={project.author.avatar?.url || '/default-avatar.png'}
//               alt="avatar"
//               className="w-8 h-8 rounded-full object-cover border dark:border-gray-600"
//             />
//             <span className="font-medium">{project.author.username}</span>
//           </div>
//         </div>
//       </motion.div>
//     </MainLayout>
//   );
// };

// export default ProjectDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from '../../services/axiosInstance';
// import MainLayout from '../../layouts/MainLayout';
// import { Calendar, User, FileText, ArrowLeft } from 'lucide-react';

// const ProjectDetail = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await axios.get(`/projects/${id}`);
//         setProject(res.data);
//       } catch (error) {
//         console.error('Error fetching project:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProject();
//   }, [id]);

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="flex items-center justify-center h-[70vh]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//         </div>
//       </MainLayout>
//     );
//   }

//   if (!project) {
//     return (
//       <MainLayout>
//         <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
//           <FileText className="w-16 h-16 text-gray-400 mb-4" />
//           <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
//             Project Not Found
//           </h2>
//           <p className="text-gray-500 mt-2">
//             We couldn’t find the project you’re looking for. It may have been removed or is temporarily unavailable.
//           </p>
//           <Link
//             to="/dashboard"
//             className="mt-6 px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
//           >
//             Back to Dashboard
//           </Link>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="max-w-5xl mx-auto px-6 py-10">
//         <Link
//           to="/dashboard"
//           className="flex items-center gap-2 text-primary hover:underline mb-6"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back to Dashboard
//         </Link>

//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
//           <div className="p-6 md:p-10">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//               {project.title || 'Untitled Project'}
//             </h1>

//             <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
//               <div className="flex items-center gap-2">
//                 <User className="w-5 h-5 text-primary" />
//                 <span>{project.owner?.name || 'Unknown'}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-primary" />
//                 <span>
//                   {project.createdAt
//                     ? new Date(project.createdAt).toLocaleDateString()
//                     : 'Unknown date'}
//                 </span>
//               </div>
//             </div>

//             <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
//               {project.description || 'No description provided.'}
//             </p>

//             {project.image && (
//               <div className="mb-8">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="rounded-xl w-full max-h-[500px] object-cover shadow-md"
//                 />
//               </div>
//             )}

//             {project.technologies && project.technologies.length > 0 && (
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
//                   Technologies Used
//                 </h2>
//                 <div className="flex flex-wrap gap-2">
//                   {project.technologies.map((tech, idx) => (
//                     <span
//                       key={idx}
//                       className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ProjectDetail;


import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../../services/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../layouts/MainLayout';
import {
  ThumbsUp,
  ExternalLink,
  Github,
  Edit,
  Trash2,
  ArrowLeft,
  Calendar,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [liking, setLiking] = useState(false);

  // --- FETCH (logic unchanged) ---
  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`/projects/${id}`);
      setProject(data.project);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch project');
    }
  };

  // --- LIKE (logic unchanged) ---
  const handleLikeToggle = async () => {
    if (!user) return;
    setLiking(true);
    try {
      const res = await axios.patch(`/projects/${id}/like`);
      setProject((prev) => ({
        ...prev,
        likes: res.data.isLiked
          ? [...prev.likes, { user: user._id }]
          : prev.likes.filter((l) => l.user !== user._id),
      }));
    } catch (err) {
      console.error('Like failed');
    } finally {
      setLiking(false);
    }
  };

  // --- STATUS CHANGE (logic unchanged) ---
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const { data } = await axios.patch(`/projects/${id}/status`, { status: newStatus });
      setProject((prev) => ({ ...prev, status: data.status }));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // --- DELETE (logic unchanged) ---
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (!confirmed) return;

    try {
      await axios.delete(`/projects/${id}`);
      alert('Project deleted successfully');
      navigate('/');
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // --- Error UI (logic unchanged: returns if error) ---
  if (error) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-center p-6 rounded-lg">
            <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
            <Link to="/dashboard" className="mt-4 inline-block text-sm text-red-600 hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  // --- Loading UI (logic unchanged: returns if !project) ---
  if (!project) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-4 border-t-indigo-600 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-300">Loading project...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // --- Derived flags (kept logic compatible; safe optional chaining) ---
  const isLiked = user && (project.likes || []).some((l) => l.user === user._id);
  const isOwner = user && user._id === project.author?._id;

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-5xl mx-auto px-4 py-10"
      >
        {/* Back */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-indigo-500 hover:underline">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-6 md:px-8 md:py-8 bg-gradient-to-r from-indigo-600 to-blue-600/80 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{project.title}</h1>
                <div className="mt-2 flex flex-wrap gap-4 text-sm opacity-90">
                  <span className="inline-flex items-center gap-2">
                    <User size={14} /> {project.author?.username || 'Unknown'}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={14} />
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown date'}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FolderTagFallback category={project.category} />
                  </span>
                </div>
              </div>

              {/* Owner actions */}
              <div className="flex items-start gap-3">
                {isOwner && (
                  <>
                    <Link
                      to={`/projects/${id}/edit`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition text-white"
                    >
                      <Edit size={16} /> Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            {/* Tags / tech */}
            <div className="mb-5 flex flex-wrap gap-3">
              {(project.technologies || []).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Images */}
            {project.images && project.images.length > 0 && (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {project.images.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img.url}
                    alt={`Project Image ${idx + 1}`}
                    whileHover={{ scale: 1.02 }}
                    className="w-full h-56 md:h-64 object-cover rounded-xl shadow-md border dark:border-gray-700"
                  />
                ))}
              </motion.div>
            )}

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                {project.description || 'No description provided.'}
              </p>
            </div>

            {/* External links */}
            <div className="flex flex-wrap gap-3 mb-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                  <ExternalLink size={16} /> Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
                >
                  <Github size={16} /> GitHub
                </a>
              )}
            </div>

            {/* Footer: likes/views/author */}
            <div className="pt-4 border-t border-gray-100 dark:border-pink-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLikeToggle}
                  disabled={!user || liking}
                  className={`inline-flex  bg-amber-300 items-center gap-2 px-3 py-2 rounded-lg border transition ${
                    isLiked
                      ? 'bg-blue/10 text-blue-400 border-blue-300'
                      : 'hover:bg-gray-50 dark:hover:bg-pink-500'
                  }`}
                >
                  <ThumbsUp size={18} />
                  <span className="text-sm font-medium">{(project.likes || []).length}</span>
                </button>

                <div className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-pink-300 text-sm">
                  Views: {project.views ?? 0}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={project.author?.avatar?.url || '/default-avatar.png'}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover border dark:border-pink-600"
                />
                <div className="text-sm">
                  <div className="font-medium">{project.author?.username || 'Unknown'}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

/** Small helper component to render category in header without changing logic */
const FolderTagFallback = ({ category }) => {
  return (
    <span className="inline-flex items-center gap-2">
      <svg className="w-4 h-4 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 7a2 2 0 0 1 2-2h3l2 2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
      <span>{category || 'General'}</span>
    </span>
  );
};

export default ProjectDetail;

 
