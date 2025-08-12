 

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../../services/axiosInstance';
// import MainLayout from '../../layouts/MainLayout';
// import { motion } from 'framer-motion';
// import {
//   UploadCloud,
//   Globe,
//   Github,
//   Pencil,
//   Image as ImageIcon,
//   CheckCircle,
// } from 'lucide-react';

// const EditProject = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     technologies: '',
//     category: 'Web Development',
//     status: 'In Progress',
//     liveUrl: '',
//     githubUrl: '',
//     isPublic: true,
//   });
//   const [images, setImages] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   // --- Fetch project (logic unchanged) ---
//   const fetchProject = async () => {
//     try {
//       const { data } = await axios.get(`/projects/${id}`);
//       const proj = data.project;
//       setForm({
//         title: proj.title,
//         description: proj.description,
//         technologies: proj.technologies.join(', '),
//         category: proj.category,
//         status: proj.status,
//         liveUrl: proj.liveUrl || '',
//         githubUrl: proj.githubUrl || '',
//         isPublic: proj.isPublic,
//       });
//       setExistingImages(proj.images || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Failed to load project');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProject();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   // --- Handlers (logic unchanged) ---
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const techArray = form.technologies
//       .split(',')
//       .map((t) => t.trim())
//       .filter(Boolean);

//     const formData = new FormData();
//     formData.append('title', form.title);
//     formData.append('description', form.description);
//     formData.append('category', form.category);
//     formData.append('status', form.status);
//     formData.append('liveUrl', form.liveUrl);
//     formData.append('githubUrl', form.githubUrl);
//     formData.append('isPublic', form.isPublic);
//     techArray.forEach((tech) => formData.append('technologies', tech));
//     images.forEach((img) => formData.append('images', img));

//     try {
//       setSubmitting(true);
//       const res = await axios.put(`/projects/${id}`, formData);
//       navigate(`/projects/${res.data.project._id}`);
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Failed to update project');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // --- Loading UI (keeps existing early-return behavior but prettier) ---
//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="max-w-2xl mx-auto py-20 flex flex-col items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
//             <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading project…</p>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   // --- Error UI ---
//   if (error) {
//     return (
//       <MainLayout>
//         <div className="max-w-2xl mx-auto py-16">
//           <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-6 rounded-lg text-center">
//             <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   // --- Main Form (UI-only polish) ---
//   return (
//     <MainLayout>
//       <motion.div
//         initial={{ opacity: 0, y: 18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35 }}
//         className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-7 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
//       >
//         <div className="flex items-center gap-3 mb-6">
//           <div className="p-3 bg-gradient-to-tr from-indigo-100 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/10 rounded-lg">
//             <Pencil className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Edit Project</h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">Update details and images for this project</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
//           <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <label className="text-sm font-medium mb-2 block">Title</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Project Title"
//               required
//               value={form.title}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//             />
//           </motion.div>

//           <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <label className="text-sm font-medium mb-2 block">Description</label>
//             <textarea
//               name="description"
//               placeholder="Project Description"
//               required
//               value={form.description}
//               onChange={handleChange}
//               rows={5}
//               className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//             />
//           </motion.div>

//           <motion.div className="grid gap-4 md:grid-cols-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <div>
//               <label className="text-sm font-medium mb-2 block">Technologies</label>
//               <input
//                 type="text"
//                 name="technologies"
//                 placeholder="Technologies (comma-separated)"
//                 value={form.technologies}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               />
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">e.g. React, Node.js, Tailwind</p>
//             </div>

//             <div className="flex gap-3">
//               <div className="flex-1">
//                 <label className="text-sm font-medium mb-2 block">Category</label>
//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                 >
//                   <option>Web Development</option>
//                   <option>Mobile App</option>
//                   <option>Desktop App</option>
//                   <option>AI/ML</option>
//                   <option>Game Development</option>
//                   <option>Other</option>
//                 </select>
//               </div>

//               <div className="flex-1">
//                 <label className="text-sm font-medium mb-2 block">Status</label>
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                   className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                 >
//                   <option>In Progress</option>
//                   <option>Completed</option>
//                   <option>On Hold</option>
//                 </select>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div className="grid gap-4 md:grid-cols-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <div className="flex items-start gap-3">
//               <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-3" />
//               <input
//                 type="url"
//                 name="liveUrl"
//                 placeholder="Live URL"
//                 value={form.liveUrl}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               />
//             </div>

//             <div className="flex items-start gap-3">
//               <Github className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-3" />
//               <input
//                 type="url"
//                 name="githubUrl"
//                 placeholder="GitHub Repo"
//                 value={form.githubUrl}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               />
//             </div>
//           </motion.div>

//           <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <label className="  text-sm font-medium mb-2 flex items-center gap-2">
//               <ImageIcon className="w-5 h-5" /> Upload Additional Images
//             </label>
//             <input
//               type="file"
//               name="images"
//               accept="image/*"
//               multiple
//               onChange={handleImageChange}
//               className="block w-full text-sm border rounded-xl p-3 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
//             />
//             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You can upload multiple screenshots (PNG, JPG).</p>
//           </motion.div>

//           {/* Existing Images */}
//           {existingImages.length > 0 && (
//             <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//               <label className="text-sm font-medium mb-2 block">Existing Images</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {existingImages.map((img, idx) => (
//                   <div
//                     key={idx}
//                     className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
//                   >
//                     <img
//                       src={img.url}
//                       alt={`Existing ${idx + 1}`}
//                       className="w-full h-32 object-cover"
//                     />
//                     <div className="absolute top-2 left-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded">
//                       #{idx + 1}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           <motion.label
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-3 mt-2 cursor-pointer"
//           >
//             <input
//               type="checkbox"
//               name="isPublic"
//               checked={form.isPublic}
//               onChange={handleChange}
//               className="form-checkbox accent-indigo-600"
//             />
//             <span className="text-sm">Public project</span>
//           </motion.label>

//           <motion.button
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileTap={{ scale: 0.985 }}
//             type="submit"
//             disabled={submitting}
//             className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-3
//               ${submitting ? 'bg-indigo-600/80 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:brightness-105'}
//               text-white transition`}
//           >
//             <CheckCircle className="w-5 h-5" />
//             {submitting ? 'Updating...' : 'Update Project'}
//           </motion.button>
//         </form>
//       </motion.div>
//     </MainLayout>
//   );
// };

// export default EditProject;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../../services/axiosInstance';
// import MainLayout from '../../layouts/MainLayout';
// import { motion } from 'framer-motion';
// import {
//   Globe,
//   Github,
//   Pencil,
//   Image as ImageIcon,
//   CheckCircle,
// } from 'lucide-react';

// const EditProject = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     technologies: '',
//     category: 'Web Development',
//     status: 'In Progress',
//     liveUrl: '',
//     githubUrl: '',
//     isPublic: true,
//   });
//   const [images, setImages] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   const fetchProject = async () => {
//     try {
//       const { data } = await axios.get(`/projects/${id}`);
//       const proj = data.project;
//       setForm({
//         title: proj.title,
//         description: proj.description,
//         technologies: proj.technologies.join(', '),
//         category: proj.category,
//         status: proj.status,
//         liveUrl: proj.liveUrl || '',
//         githubUrl: proj.githubUrl || '',
//         isPublic: proj.isPublic,
//       });
//       setExistingImages(proj.images || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Failed to load project');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProject();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const techArray = form.technologies
//       .split(',')
//       .map((t) => t.trim())
//       .filter(Boolean);

//     const formData = new FormData();
//     formData.append('title', form.title);
//     formData.append('description', form.description);
//     formData.append('category', form.category);
//     formData.append('status', form.status);
//     formData.append('liveUrl', form.liveUrl);
//     formData.append('githubUrl', form.githubUrl);
//     formData.append('isPublic', form.isPublic);
//     techArray.forEach((tech) => formData.append('technologies', tech));
//     images.forEach((img) => formData.append('images', img));

//     try {
//       setSubmitting(true);
//       const res = await axios.put(`/projects/${id}`, formData);
//       navigate(`/projects/${res.data.project._id}`);
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Failed to update project');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="max-w-2xl mx-auto py-20 flex flex-col items-center gap-3">
//           <div className="w-12 h-12 rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-indigo-500 animate-spin" />
//           <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading project…</p>
//         </div>
//       </MainLayout>
//     );
//   }

//   if (error) {
//     return (
//       <MainLayout>
//         <div className="max-w-2xl mx-auto py-16">
//           <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-800 p-6 rounded-xl text-center shadow-md">
//             <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <motion.div
//         initial={{ opacity: 0, y: 18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35 }}
//         className="max-w-2xl mx-auto bg-gradient-to-b from-white/95 to-gray-50/95 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-sm p-7 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8">
//           <div className="p-3 bg-gradient-to-tr from-indigo-100 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/10 rounded-lg shadow-inner">
//             <Pencil className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Edit Project</h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">Update details and images for this project</p>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
//           {/* Title */}
//           <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <label className="text-sm font-medium mb-2 block">Title</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Project Title"
//               required
//               value={form.title}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//             />
//           </motion.div>

//           {/* Description */}
//           <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <label className="text-sm font-medium mb-2 block">Description</label>
//             <textarea
//               name="description"
//               placeholder="Project Description"
//               required
//               value={form.description}
//               onChange={handleChange}
//               rows={5}
//               className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//             />
//           </motion.div>

//           {/* Technologies, Category & Status */}
//           <motion.div className="grid gap-4 md:grid-cols-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <div>
//               <label className="text-sm font-medium mb-2 block">Technologies</label>
//               <input
//                 type="text"
//                 name="technologies"
//                 placeholder="React, Node.js, Tailwind"
//                 value={form.technologies}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               />
//             </div>

//             <div className="flex gap-3">
//               <div className="flex-1">
//                 <label className="text-sm font-medium mb-2 block">Category</label>
//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                 >
//                   <option>Web Development</option>
//                   <option>Mobile App</option>
//                   <option>Desktop App</option>
//                   <option>AI/ML</option>
//                   <option>Game Development</option>
//                   <option>Other</option>
//                 </select>
//               </div>

//               <div className="flex-1">
//                 <label className="text-sm font-medium mb-2 block">Status</label>
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                   className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                 >
//                   <option>In Progress</option>
//                   <option>Completed</option>
//                   <option>On Hold</option>
//                 </select>
//               </div>
//             </div>
//           </motion.div>

//           {/* Links */}
//           <motion.div className="grid gap-4 md:grid-cols-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <div className="flex items-start gap-3">
//               <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-3" />
//               <input
//                 type="url"
//                 name="liveUrl"
//                 placeholder="Live URL"
//                 value={form.liveUrl}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               />
//             </div>

//             <div className="flex items-start gap-3">
//               <Github className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-3" />
//               <input
//                 type="url"
//                 name="githubUrl"
//                 placeholder="GitHub Repo"
//                 value={form.githubUrl}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700
//                            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               />
//             </div>
//           </motion.div>

//           {/* Image Upload */}
//           <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//             <label className="text-sm font-medium mb-2 flex items-center gap-2">
//               <ImageIcon className="w-5 h-5" /> Upload Additional Images
//             </label>
//             <input
//               type="file"
//               name="images"
//               accept="image/*"
//               multiple
//               onChange={handleImageChange}
//               className="block w-full text-sm border rounded-xl p-3 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
//             />
//             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You can upload multiple screenshots (PNG, JPG).</p>
//           </motion.div>

//           {/* Existing Images */}
//           {existingImages.length > 0 && (
//             <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//               <label className="text-sm font-medium mb-2 block">Existing Images</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {existingImages.map((img, idx) => (
//                   <div
//                     key={idx}
//                     className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
//                   >
//                     <img src={img.url} alt={`Existing ${idx + 1}`} className="w-full h-32 object-cover" />
//                     <div className="absolute top-2 left-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded">
//                       #{idx + 1}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* Public Checkbox */}
//           <motion.label
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-3 mt-2 cursor-pointer"
//           >
//             <input
//               type="checkbox"
//               name="isPublic"
//               checked={form.isPublic}
//               onChange={handleChange}
//               className="form-checkbox accent-indigo-600"
//             />
//             <span className="text-sm">Public project</span>
//           </motion.label>

//           {/* Submit */}
//           <motion.button
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileTap={{ scale: 0.985 }}
//             type="submit"
//             disabled={submitting}
//             className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-3
//               ${submitting ? 'bg-indigo-600/80 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:brightness-105'}
//               text-white transition`}
//           >
//             <CheckCircle className="w-5 h-5" />
//             {submitting ? 'Updating...' : 'Update Project'}
//           </motion.button>
//         </form>
//       </motion.div>
//     </MainLayout>
//   );
// };

// export default EditProject;


 
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/axiosInstance';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import {
  Globe,
  Github,
  Pencil,
  Image as ImageIcon,
  CheckCircle,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'Web Development',
    status: 'In Progress',
    liveUrl: '',
    githubUrl: '',
    isPublic: true,
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`/projects/${id}`);
      const proj = data.project;
      setForm({
        title: proj.title,
        description: proj.description,
        technologies: proj.technologies.join(', '),
        category: proj.category,
        status: proj.status,
        liveUrl: proj.liveUrl || '',
        githubUrl: proj.githubUrl || '',
        isPublic: proj.isPublic,
      });
      setExistingImages(proj.images || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const techArray = form.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('status', form.status);
    formData.append('liveUrl', form.liveUrl);
    formData.append('githubUrl', form.githubUrl);
    formData.append('isPublic', form.isPublic);
    techArray.forEach((tech) => formData.append('technologies', tech));
    images.forEach((img) => formData.append('images', img));

    try {
      setSubmitting(true);
      const res = await axios.put(`/projects/${id}`, formData);
      navigate(`/projects/${res.data.project._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen    ">
          <div className="max-w-2xl mx-auto py-20 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-400 via-blue-500 to-pink-500 animate-spin">
                <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full"></div>
              </div>
            </div>
            <p className="text-xl font-semibold bg-gradient-to-r from-violet-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Loading project…
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50 dark:from-violet-950 dark:via-blue-950 ">
          <div className="max-w-2xl mx-auto py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200 dark:border-red-800 p-8 rounded-2xl text-center shadow-xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-700 dark:text-red-300 font-semibold text-lg">{error}</p>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50 dark:from-violet-950 dark:via-blue-950 dark:to-pink-950 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto px-4"
        >
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50 relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-pink-500/5 pointer-events-none"></div>
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 mb-10 relative z-10"
            >
              <div className="p-4 bg-gradient-to-br from-violet-500 via-blue-500 to-pink-500 rounded-2xl shadow-lg">
                <Pencil className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Edit Project
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Update your project details and showcase your work</p>
              </div>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8 relative z-10">
              {/* Title */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <label className="text-sm font-semibold mb-3 block bg-gradient-to-r from-violet-700 via-blue-700 to-pink-700 bg-clip-text text-transparent">
                  Project Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter your amazing project title..."
                    required
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 
                               backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                               focus:outline-none focus:border-transparent focus:ring-4 focus:ring-violet-500/20 
                               transition-all duration-300 group-hover:border-violet-300 dark:group-hover:border-violet-600"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="group"
              >
                <label className="text-sm font-semibold mb-3 block bg-gradient-to-r from-violet-700 via-blue-700 to-pink-700 bg-clip-text text-transparent">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    placeholder="Describe your project, its features, and what makes it special..."
                    required
                    value={form.description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 
                               backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                               focus:outline-none focus:border-transparent focus:ring-4 focus:ring-violet-500/20 
                               transition-all duration-300 group-hover:border-violet-300 dark:group-hover:border-violet-600 resize-none"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Technologies */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="group"
              >
                <label className="text-sm font-semibold mb-3 block bg-gradient-to-r from-violet-700 via-blue-700 to-pink-700 bg-clip-text text-transparent">
                  Technologies Used
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="technologies"
                    placeholder="React, Node.js, Tailwind CSS, MongoDB..."
                    value={form.technologies}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 
                               backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                               focus:outline-none focus:border-transparent focus:ring-4 focus:ring-violet-500/20 
                               transition-all duration-300 group-hover:border-violet-300 dark:group-hover:border-violet-600"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Separate technologies with commas</p>
              </motion.div>

              {/* Category & Status */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="grid gap-6 md:grid-cols-2"
              >
                <div className="group">
                  <label className="text-sm font-semibold mb-3 block bg-gradient-to-r from-violet-700 via-blue-700 to-pink-700 bg-clip-text text-transparent">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 
                                 backdrop-blur-sm text-gray-900 dark:text-white
                                 focus:outline-none focus:border-transparent focus:ring-4 focus:ring-violet-500/20 
                                 transition-all duration-300 group-hover:border-violet-300 dark:group-hover:border-violet-600
                                 appearance-none cursor-pointer"
                    >
                      <option>Web Development</option>
                      <option>Mobile App</option>
                      <option>Desktop App</option>
                      <option>AI/ML</option>
                      <option>Game Development</option>
                      <option>Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-semibold mb-3 block bg-gradient-to-r from-violet-700 via-blue-700 to-pink-700 bg-clip-text text-transparent">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 
                                 backdrop-blur-sm text-gray-900 dark:text-white
                                 focus:outline-none focus:border-transparent focus:ring-4 focus:ring-violet-500/20 
                                 transition-all duration-300 group-hover:border-violet-300 dark:group-hover:border-violet-600
                                 appearance-none cursor-pointer"
                    >
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>On Hold</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </motion.div>

              {/* Links */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="grid gap-6 md:grid-cols-2"
              >
                <div className="group">
                  <label className="text-sm font-semibold mb-3 flex items-center gap-2 bg-gradient-to-r from-violet-700 via-blue-700 to-pink-700 bg-clip-text text-transparent">
                    <Globe className="w-5 h-5 text-violet-500" />
                    Live Demo URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="liveUrl"
                      placeholder="https://your-awesome-project.com"
                      value={form.liveUrl}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 
                                 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                 focus:outline-none focus:border-transparent focus:ring-4 focus:ring-violet-500/20 
                                 transition-all duration-300 group-hover:border-violet-300 dark:group-hover:border-violet-600"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-semibold mb-3 flex items-center gap-2 bg-gradient-to-r from-violet-700 via-blue-700 to-pink-700 bg-clip-text text-transparent">
                    <Github className="w-5 h-5 text-blue-500" />
                    GitHub Repository
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="githubUrl"
                      placeholder="https://github.com/username/repo"
                      value={form.githubUrl}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 
                                 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                 focus:outline-none focus:border-transparent focus:ring-4 focus:ring-violet-500/20 
                                 transition-all duration-300 group-hover:border-violet-300 dark:group-hover:border-violet-600"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </motion.div>

              {/* Image Upload */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="group"
              >
                <label className="text-sm font-semibold mb-3 flex items-center gap-2 bg-gradient-to-r from-violet-700 via-blue-700 to-pink-700 bg-clip-text text-transparent">
                  <ImageIcon className="w-5 h-5 text-pink-500" />
                  Upload Additional Images
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-sm p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl 
                               bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm text-gray-900 dark:text-white
                               hover:border-violet-400 dark:hover:border-violet-500 transition-all duration-300
                               file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold
                               file:bg-gradient-to-r file:from-violet-500 file:via-blue-500 file:to-pink-500 file:text-white
                               file:cursor-pointer hover:file:brightness-110"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Upload high-quality screenshots to showcase your project (PNG, JPG, WebP supported)
                </p>
              </motion.div>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="text-sm font-semibold mb-4 block bg-gradient-to-r from-violet-700 via-blue-700 to-pink-700 bg-clip-text text-transparent">
                    Current Images
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {existingImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        className="relative group rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 
                                   bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300
                                   hover:border-violet-300 dark:hover:border-violet-600"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={img.url} 
                            alt={`Project image ${idx + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <span className="text-white text-sm font-medium">Image #{idx + 1}</span>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                              >
                                <Eye className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Public Toggle */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-violet-50/50 via-blue-50/50 to-pink-50/50 
                           dark:from-violet-900/20 dark:via-blue-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-violet-500 via-blue-500 to-pink-500 rounded-xl">
                    {form.isPublic ? (
                      <Eye className="w-5 h-5 text-white" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Project Visibility</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {form.isPublic ? 'Your project is visible to everyone' : 'Your project is private'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={form.isPublic}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="relative w-14 h-8 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 
                                  peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer 
                                  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                                  after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 
                                  after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:via-blue-500 peer-checked:to-pink-500">
                  </div>
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={submitting}
                  className={`group relative w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3
                    overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                    ${submitting 
                      ? 'bg-gradient-to-r from-violet-400 via-blue-400 to-pink-400 cursor-not-allowed opacity-75' 
                      : 'bg-gradient-to-r from-violet-600 via-blue-600 to-pink-600 hover:from-violet-700 hover:via-blue-700 hover:to-pink-700 shadow-xl hover:shadow-2xl'
                    } text-white`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-blue-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <CheckCircle className={`w-6 h-6 relative z-10 ${submitting ? 'animate-spin' : ''}`} />
                  <span className="relative z-10">
                    {submitting ? 'Updating Project...' : 'Update Project'}
                  </span>
                  
                  {!submitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default EditProject;