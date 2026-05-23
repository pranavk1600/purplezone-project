import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

import bgImage from '../assets/sunset-5536777_1920.png';
import logo from '../assets/Purplezonewt 1.png';

const Login = () => {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in both fields.');
      return;
    }

    try {
      await login({ email, password });
      toast.success('Welcome back!');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Unable to login'
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

      {/* MAIN LAYOUT */}
      <div className="flex min-h-screen">

        {/* LEFT IMAGE */}
        <div
          className="hidden md:block md:w-[63%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />

        {/* RIGHT GRAY */}
        <div className="w-full md:w-[37%] bg-[#5b606b]" />
      </div>

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          h-[420px]
          w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-[12px]
          bg-[#f5f5f5]
          p-12
          shadow-[0_10px_40px_rgba(0,0,0,0.25)]
          md:left-[69%]
        "
      >

        {/* TOP TABS */}
        <div className="mb-16 flex items-center justify-center gap-8 text-[14px] font-medium text-gray-500">

          <Link
            to="/register"
            className="transition hover:text-purple-700"
          >
            REGISTER
          </Link>

          <div className="h-5 w-px bg-gray-300" />

          <span className="text-purple-800">
            LOGIN
          </span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* USERNAME */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              className="
                w-full
                border-b
                border-gray-300
                bg-transparent
                px-0
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
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="
                w-full
                border-b
                border-gray-300
                bg-transparent
                px-0
                py-4
                pr-10
                text-[14px]
                text-gray-700
                outline-none
                placeholder:text-gray-400
                focus:border-purple-600
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
                absolute
                right-0
                top-3
                text-gray-400
                transition
                hover:text-purple-700
              "
            >
             
            </button>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={loading}
              className="
                rounded-lg
                bg-[#e5e5e5]
                px-10
                py-2
                text-sm
                text-gray-600
                transition-all
                duration-300
                hover:bg-purple-600
                hover:text-white
                disabled:opacity-60
              "
            >
              {loading ? 'Signing In...' : 'Submit'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;