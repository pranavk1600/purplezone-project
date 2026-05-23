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
      toast.error(error?.response?.data?.message || 'Unable to login');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      
      {/* Top Navbar */}
      <div className="absolute top-0 left-0 z-30 w-full bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <img
            src={logo}
            alt="PurpleZone"
            className="h-10 object-contain"
          />
        </div>
      </div>

      {/* Split Layout */}
      <div className="flex min-h-screen">

        {/* Left Image Side */}
        <div
          className="hidden md:block md:w-[65%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />

        {/* Right Dark Side */}
        <div className="w-full md:w-[35%] bg-[#5c616d]" />
      </div>

      {/* Purple Glow */}
      <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-purple-700/30 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-fuchsia-600/20 blur-3xl" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          w-[92%]
          max-w-md
          -translate-x-1/2
          -translate-y-1/2
          rounded-[28px]
          border border-white/20
          bg-white/90
          p-8
          shadow-[0_10px_60px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
          md:left-[68%]
        "
      >

        {/* Tabs */}
        <div className="mb-10 flex items-center justify-center gap-6 text-sm font-semibold tracking-wide text-gray-500">
          <Link
            to="/register"
            className="transition hover:text-purple-600"
          >
            REGISTER
          </Link>

          <div className="h-5 w-px bg-gray-300" />

          <span className="text-purple-700">
            LOGIN
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Email */}
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
                px-1
                py-3
                text-sm
                text-gray-700
                outline-none
                transition-all
                placeholder:text-gray-400
                focus:border-purple-600
              "
            />
          </div>

          {/* Password */}
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
                px-1
                py-3 pr-10
                text-sm
                text-gray-700
                outline-none
                transition-all
                placeholder:text-gray-400
                focus:border-purple-600
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
                absolute
                right-1
                top-3
                text-gray-400
                transition
                hover:text-purple-600
              "
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-gradient-to-r
                from-purple-600
                to-fuchsia-500
                px-10
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-purple-500/40
                disabled:opacity-60
              "
            >
              {loading ? 'Signing In...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-purple-700 hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;