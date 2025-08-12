 


import React, { use, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  // const { theme, toggleTheme } = useTheme();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-background text-foreground px-6 py-4 flex justify-between items-center shadow-md"
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold tracking-tight"
        >
          <Link to="/" className="hover:text-blue-400 transition-colors duration-200">
            ProjectHub
          </Link>
        </motion.h1>
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            title="Toggle Theme"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <Link to="/profile" className="hover:underline text-sm">
            {user?.username}
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            title="Logout"
            className="hover:text-red-400 transition-colors duration-200"
          >
            <LogOut size={20} />
          </motion.button>
        </div>
      </motion.header>

      <main className="flex-grow px-4 py-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

//  import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
// import { LogOut, Sun, Moon } from 'lucide-react';
// import { motion } from 'framer-motion';

// const MainLayout = ({ children }) => {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      
//       {/* Header */}
//       <motion.header
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: 'spring', stiffness: 90 }}
//         className="px-6 py-4 shadow-md border-b border-gray-200 dark:border-gray-800 
//                    bg-white dark:bg-gray-900"
//       >
//         <div className="flex justify-between items-center">
          
//           {/* Logo */}
//           <motion.h1
//             whileHover={{ scale: 1.05 }}
//             className="text-2xl font-bold tracking-tight"
//           >
//             <Link
//               to="/"
//               className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
//             >
//               ProjectHub
//             </Link>
//           </motion.h1>

//           {/* Actions */}
//           <div className="flex items-center gap-4">
            
//             {/* Theme Toggle */}
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               onClick={toggleTheme}
//               title="Toggle Theme"
//               className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
//             >
//               {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
//             </motion.button>

//             {/* Profile */}
//             <Link
//               to="/profile"
//               className="text-sm font-medium hover:underline underline-offset-2"
//             >
//               {user?.username}
//             </Link>

//             {/* Logout */}
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               onClick={handleLogout}
//               title="Logout"
//               className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
//             >
//               <LogOut size={20} className="text-red-500" />
//             </motion.button>
//           </div>
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <main className="flex-grow px-4 md:px-8 py-6 transition-colors duration-300">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default MainLayout;

// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
// import { LogOut, Sun, Moon } from 'lucide-react';
// import { motion } from 'framer-motion';

// const MainLayout = ({ children }) => {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       {/* HEADER */}
//       <motion.header
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: 'spring', stiffness: 100 }}
//         className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-4 flex justify-between items-center shadow-md"
//       >
//         {/* Logo / Title */}
//         <motion.h1
//           whileHover={{ scale: 1.05 }}
//           className="text-2xl font-bold tracking-tight"
//         >
//           <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
//             ProjectHub
//           </Link>
//         </motion.h1>

//         {/* Actions */}
//         <div className="flex items-center gap-4">
//           {/* Theme Toggle */}
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={toggleTheme}
//             title="Toggle Theme"
//             className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//           >
//             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
//           </motion.button>

//           {/* Username */}
//           {user && (
//             <Link
//               to="/profile"
//               className="text-sm font-medium hover:underline"
//             >
//               {user.username}
//             </Link>
//           )}

//           {/* Logout */}
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={handleLogout}
//             title="Logout"
//             className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-800 transition-colors duration-200"
//           >
//             <LogOut size={20} />
//           </motion.button>
//         </div>
//       </motion.header>

//       {/* MAIN CONTENT */}
//       <main className="flex-grow px-4 py-6">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default MainLayout;
