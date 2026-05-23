import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

import bgImage from '../assets/sunset-5536777_1920.png';
import logo from '../assets/Purplezonewt 1.png';

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    try {
      await register({ name, email, password });

      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Unable to register'
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">

      {/* NAVBAR */}
      <div className="absolute top-0 left-0 z-30 w-full bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-10">
          <img
            src={logo}
            alt="PurpleZone"
            className="h-8 object-contain"
          />
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="flex min-h-screen">

        {/* LEFT IMAGE */}
        <div
          className="hidden md:block md:w-[63%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />

        {/* RIGHT BACKGROUND */}
        <div className="w-full md:w-[37%] bg-[#5c616c]" />
      </div>

      {/* REGISTER BOX */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          absolute
          left-1/2
          top-[38%]
          z-20
          h-[470px]
          w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-[12px]
          bg-[#f5f5f5]
          p-12
          shadow-[0_10px_40px_rgba(0,0,0,0.25)]
          md:left-[74%]
        "
      >

        {/* TOP MENU */}
        <div className="mb-14 flex items-center justify-center gap-8 text-[14px] font-medium">

          <span className="text-purple-800">
            REGISTER
          </span>

          <div className="h-5 w-px bg-gray-300" />

          <Link
            to="/login"
            className="text-gray-500 transition hover:text-purple-700"
          >
            LOGIN
          </Link>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* NAME */}
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="
                w-full
                border-b
                border-gray-300
                bg-transparent
                py-4
                text-[14px]
                text-gray-700
                outline-none
                placeholder:text-gray-400
                focus:border-purple-600
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="
                w-full
                border-b
                border-gray-300
                bg-transparent
                py-4
                text-[14px]
                text-gray-700
                outline-none
                placeholder:text-gray-400
                focus:border-purple-600
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="
                w-full
                border-b
                border-gray-300
                bg-transparent
                py-4
                text-[14px]
                text-gray-700
                outline-none
                placeholder:text-gray-400
                focus:border-purple-600
              "
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className="
                rounded-md
                bg-[#e6e6e6]
                px-10
                py-2
                text-sm
                text-gray-600
                transition-all
                duration-300
                hover:bg-purple-700
                hover:text-white
                disabled:opacity-60
              "
            >
              {loading ? 'Creating...' : 'Submit'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;