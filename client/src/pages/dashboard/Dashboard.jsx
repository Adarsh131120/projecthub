 


// import React, { useEffect, useState } from 'react';
// import axios from '../../services/axiosInstance';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import MainLayout from '../../layouts/MainLayout';
// import { PlusCircle, Eye, ThumbsUp, Layers, Search, Filter } from 'lucide-react';
// import { motion } from 'framer-motion';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [projects, setProjects] = useState([]);
//   const [filters, setFilters] = useState({
//     search: '',
//     category: 'all',
//     sortBy: 'createdAt',
//     page: 1,
//     limit: 6,
//   });
//   const [pagination, setPagination] = useState(null);

//   const fetchProjects = async () => {
//     try {
//       const params = { ...filters };
//       const { data } = await axios.get('/projects', { params });
//       setProjects(data.projects);
//       setPagination(data.pagination);
//     } catch (err) {
//       console.error('Error loading projects', err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, [filters]);

//   return (
//     <MainLayout>
//       {/* Top Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
//       >
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
//           Explore Projects
//         </h2>
//         <Link
//           to="/projects/new"
//           className="inline-flex items-center gap-2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
//         >
//           <PlusCircle size={20} /> New Project
//         </Link>
//       </motion.div>

//       {/* Filters */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.05 }}
//         className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
//       >
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search by title or tech..."
//             value={filters.search}
//             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//             className="pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full"
//           />
//         </div>
//         <div className="relative">
//           <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <select
//             value={filters.category}
//             onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//             className="pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full"
//           >
//             <option value="all">All Categories</option>
//             <option value="Web Development">Web</option>
//             <option value="Mobile App">Mobile</option>
//             <option value="Desktop App">Desktop</option>
//             <option value="AI/ML">AI/ML</option>
//             <option value="Game Development">Game</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//       </motion.div>

//       {/* Projects List */}
//       {projects.length === 0 ? (
//         <div className="flex flex-col items-center justify-center mt-16 text-center">
//           <img
//             src="https://illustrations.popsy.co/gray/man-working-on-computer.svg"
//             alt="No projects"
//             className="w-60 opacity-80 mb-6"
//           />
//           <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
//             No projects found.
//           </p>
//           <Link
//             to="/projects/new"
//             className="px-5 py-2 rounded-full bg-indigo-600 text-white shadow hover:shadow-lg hover:scale-105 transition"
//           >
//             Create your first project
//           </Link>
//         </div>
//       ) : (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={{
//             hidden: {},
//             visible: { transition: { staggerChildren: 0.06 } },
//           }}
//           className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//         >
//           {projects.map((proj, index) => (
//             <motion.div
//               key={proj._id}
//               initial={{ opacity: 0, y: 25 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//             >
//               <Link
//                 to={`/projects/${proj._id}`}
//                 className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
//               >
//                 <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
//                   {proj.title}
//                 </h3>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
//                   {proj.category}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {proj.technologies.map((tech, i) => (
//                     <span
//                       key={i}
//                       className="bg-gray-200 dark:bg-gray-700 text-xs px-3 py-1 rounded-full text-gray-800 dark:text-white"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
//                   <span className="flex items-center gap-1">
//                     <Eye size={14} /> {proj.views}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <ThumbsUp size={14} /> {proj.likes.length}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Layers size={14} /> {proj.status}
//                   </span>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}

//       {/* Pagination */}
//       {pagination && (
//         <div className="flex justify-center items-center gap-4 mt-10">
//           <button
//             disabled={!pagination.hasPrev}
//             onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
//             className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-40"
//           >
//             Prev
//           </button>
//           <span className="text-sm text-gray-600 dark:text-gray-300">
//             Page {pagination.currentPage} of {pagination.totalPages}
//           </span>
//           <button
//             disabled={!pagination.hasNext}
//             onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
//             className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </MainLayout>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInstance';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../layouts/MainLayout';
import { PlusCircle, Eye, ThumbsUp, Layers, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sortBy: 'createdAt',
    page: 1,
    limit: 6,
  });
  const [pagination, setPagination] = useState(null);

  const fetchProjects = async () => {
    try {
      const params = { ...filters };
      const { data } = await axios.get('/projects', { params });
      setProjects(data.projects);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error loading projects', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  return (
    <MainLayout>
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
          Explore Projects
        </h2>
        <Link
          to="/projects/new"
          className="inline-flex items-center gap-2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
        >
          <PlusCircle size={20} /> New Project
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
          <input
            type="text"
            placeholder="Search by title or tech..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white shadow-md focus:ring-2 focus:ring-indigo-500 outline-none w-full"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="pl-10 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white shadow-md focus:ring-2 focus:ring-indigo-500 outline-none w-full"
          >
            <option value="all">All Categories</option>
            <option value="Web Development">Web</option>
            <option value="Mobile App">Mobile</option>
            <option value="Desktop App">Desktop</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Game Development">Game</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </motion.div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 text-center">
          <img
            src="https://illustrations.popsy.co/gray/man-working-on-computer.svg"
            alt="No projects"
            className="w-60 opacity-80 mb-6"
          />
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            No projects found.
          </p>
          <Link
            to="/projects/new"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow hover:shadow-lg hover:scale-105 transition"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((proj, index) => (
            <motion.div
              key={proj._id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/projects/${proj._id}`}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 block"
              >
                <h3 className="font-bold text-lg light: text-indigo-500    dark:text-white mb-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-indigo-500 font-medium mb-3">
                  {proj.category}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-indigo-50 dark:bg-indigo-900/30 text-xs px-3 py-1 rounded-full text-indigo-600 dark:text-indigo-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {proj.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={14} /> {proj.likes.length}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers size={14} /> {proj.status}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={!pagination.hasPrev}
            onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
            className="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            disabled={!pagination.hasNext}
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            className="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
