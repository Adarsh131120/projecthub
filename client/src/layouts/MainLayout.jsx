// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
// import { LogOut, Sun, Moon } from 'lucide-react';

// const MainLayout = ({ children }) => {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
//         <h1 className="text-xl font-bold">
//           <Link to="/">ProjectHub</Link>
//         </h1>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={toggleTheme}
//             title="Toggle Theme"
//             className="hover:text-yellow-400"
//           >
//             {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
//           </button>
//           <Link to="/profile" className="hover:underline">
//             {user?.username}
//           </Link>
//           <button onClick={handleLogout} title="Logout">
//             <LogOut size={20} />
//           </button>
//         </div>
//       </header>

//       <main className="flex-grow p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default MainLayout;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Sun, Moon } from 'lucide-react';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-300">
      <header className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-4 py-3 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:text-blue-400">ProjectHub</Link>
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            title="Toggle Theme"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/profile" className="hover:underline">
            {user?.username}
          </Link>
          <button onClick={handleLogout} title="Logout" className="hover:text-red-400 transition-colors duration-200">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="flex-grow p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
