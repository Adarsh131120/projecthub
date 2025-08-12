 

// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { LoaderCircle, LogIn } from 'lucide-react';
// import { motion } from 'framer-motion';

// const Login = () => {
//   const { login, user, loading } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (user) navigate('/');
//   }, [user, navigate]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     const res = await login(form.email, form.password);
//     if (res.success) {
//       navigate('/');
//     } else {
//       setError(res.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
//       <motion.form
//         onSubmit={handleSubmit}
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//         className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-4"
//       >
//         <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-4">
//           Welcome Back
//         </h2>

//         {error && <p className="text-red-600 text-center text-sm">{error}</p>}

//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//           className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//           className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <motion.button
//           type="submit"
//           disabled={loading}
//           whileTap={{ scale: 0.95 }}
//           className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-all duration-300"
//         >
//           {loading ? (
//             <LoaderCircle className="animate-spin" size={20} />
//           ) : (
//             <>
//               <LogIn size={18} /> Login
//             </>
//           )}
//         </motion.button>

//         <p className="text-sm text-center text-gray-700 dark:text-gray-300">
//           Don&apos;t have an account?{' '}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </motion.form>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoaderCircle, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(form.email, form.password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl space-y-5"
      >
        <h2 className="text-4xl font-bold text-center text-white">
          Welcome Back
        </h2>
        <p className="text-center text-gray-300 text-sm">
          Please sign in to your account
        </p>

        {error && (
          <p className="text-red-500 bg-red-500/10 border border-red-500/30 p-2 rounded-md text-center text-sm">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg border border-gray-500/30 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg border border-gray-500/30 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <>
              <LogIn size={18} /> Login
            </>
          )}
        </motion.button>

        <p className="text-sm text-center text-gray-300">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
