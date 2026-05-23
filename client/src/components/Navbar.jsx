import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card sticky top-0 z-30 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 shadow-glow"
    >
      <Link to="/dashboard" className="text-xl font-semibold tracking-tight text-sky-500 dark:text-sky-300">
        Grammar Error Correction
      </Link>
      <nav className="flex flex-wrap items-center gap-3 text-slate-700 dark:text-slate-200">
        <Link to="/dashboard" className="rounded-2xl px-4 py-2 transition hover:bg-slate-100/80 dark:hover:bg-slate-800/80">
          Dashboard
        </Link>
        <Link to="/results" className="rounded-2xl px-4 py-2 transition hover:bg-slate-100/80 dark:hover:bg-slate-800/80">
          Results
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/60 bg-white/90 text-slate-900 shadow-sm transition hover:bg-slate-100 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 3.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4.5A.75.75 0 0 1 12 3.75Zm0 14.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm8.25-6.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm-14.25 0a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM17.657 6.343a.75.75 0 0 1 0 1.06l-1.061 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.061 0Zm-9.192 9.192a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm9.192 1.06a.75.75 0 0 1-1.061 0l-1.06-1.06a.75.75 0 1 1 1.06-1.06l1.061 1.06a.75.75 0 0 1 0 1.06Zm-9.192-9.192a.75.75 0 0 1-1.061 0l-1.06-1.06a.75.75 0 1 1 1.06-1.06l1.061 1.06a.75.75 0 0 1 0 1.06Zm4.243 1.82a4.5 4.5 0 1 0 4.243 4.243 4.5 4.5 0 0 0-4.243-4.243Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M21.752 15.002a.75.75 0 0 0-1.037-.406 8.25 8.25 0 0 1-10.56-10.56.75.75 0 0 0-.406-1.037A9.75 9.75 0 1 0 21.752 15.002Z" />
            </svg>
          )}
        </button>
        {user ? (
          <button onClick={logout} className="rounded-2xl bg-sky-500 px-4 py-2 text-slate-950 transition hover:bg-sky-400">
            Logout
          </button>
        ) : (
          <Link to="/login" className="rounded-2xl bg-slate-700 px-4 py-2 text-slate-100 transition hover:bg-slate-600">
            Login
          </Link>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;
