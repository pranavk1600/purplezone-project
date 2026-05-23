import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

import bgImage from '../assets/sunset-5536777_1920.png';
import logo from '../assets/Purplezonewt.png';

const Register = () => {
  const { register, loading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    try {
      await register({ name, email, password });
      toast.success('Registration successful!');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Unable to register'
      );
    }
  };

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Purple Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[450px] w-[450px] rounded-full bg-purple-700/30 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[450px] w-[450px] rounded-full bg-fuchsia-600/20 blur-3xl" />

      {/* Register Card */}
      <div className="relative z-20 w-full max-w-md px-5">
        <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl">

          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src={logo}
              alt="PurpleZone"
              className="
                h-20
                md:h-24
                w-auto
                object-contain
                drop-shadow-[0_0_40px_rgba(168,85,247,1)]
                transition-all
                duration-300
                hover:scale-105
              "
            />
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="bg-gradient-to-r from-white via-purple-200 to-fuchsia-300 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
              Create Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Join PurpleZone and start improving your grammar skills.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="
                  w-full rounded-2xl border border-white/10
                  bg-black/40 px-5 py-4 text-white
                  outline-none transition-all duration-300
                  placeholder:text-slate-400
                  focus:border-purple-500
                  focus:bg-black/50
                  focus:ring-2 focus:ring-purple-500/40
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="
                  w-full rounded-2xl border border-white/10
                  bg-black/40 px-5 py-4 text-white
                  outline-none transition-all duration-300
                  placeholder:text-slate-400
                  focus:border-purple-500
                  focus:bg-black/50
                  focus:ring-2 focus:ring-purple-500/40
                "
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="
                  w-full rounded-2xl border border-white/10
                  bg-black/40 px-5 py-4 pr-14 text-white
                  outline-none transition-all duration-300
                  placeholder:text-slate-400
                  focus:border-purple-500
                  focus:bg-black/50
                  focus:ring-2 focus:ring-purple-500/40
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="
                  absolute right-5 top-[52px]
                  text-lg text-slate-400
                  transition hover:text-white
                "
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full rounded-2xl
                bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500
                px-5 py-4 text-lg font-semibold text-white
                shadow-lg shadow-purple-900/50
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-purple-700/60
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-purple-300 transition hover:text-white hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;