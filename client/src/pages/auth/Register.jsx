 


// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { LoaderCircle } from 'lucide-react';

// const Register = () => {
//   const { register, loading } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username : '',
//     email: '',
//     password: '',
//     bio: ''
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e ) => {
//     e.preventDefault();
//     console.log('Form data before sending:', form); // ✅ Debug
//     const res = await register(form);
//     if (res.success) {
//       navigate('/');
//     } else {
//       setError(res.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         <input
//           type="text"
//           name="username"
//           value={form.username}
//           onChange={handleChange}
//           placeholder="userName"
//           required
//           className="w-full p-2 mb-4 rounded border"
//         />

//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//           className="w-full p-2 mb-4 rounded border"
//         />

//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//           className="w-full p-2 mb-4 rounded border"
//         />

//         <textarea
//           name="bio"
//           value={form.bio}
//           onChange={handleChange}
//           placeholder="Short Bio"
//           required
//           className="w-full p-2 mb-6 rounded border resize-none"
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center"
//         >
//           {loading ? <LoaderCircle className="animate-spin" /> : 'Register'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username : '',
    email: '',
    password: '',
    bio: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e ) => {
    e.preventDefault();
    const res = await register(form);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message || 'Registration failed');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Register
        </h2>

        {error && <p className="text-red-600 mb-4 text-center text-sm">{error}</p>}

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full p-3 mb-4 rounded-lg border dark:bg-gray-700 dark:text-white"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded-lg border dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-3 mb-4 rounded-lg border dark:bg-gray-700 dark:text-white"
        />

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Short Bio"
          required
          className="w-full p-3 mb-6 rounded-lg border dark:bg-gray-700 dark:text-white resize-none"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : 'Register'}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Register;
