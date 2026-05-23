import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mx-auto max-w-xl py-28 px-5 text-center">
      <div className="glass-card border border-slate-700/50 p-10 shadow-glass">
        <h1 className="text-5xl font-bold text-slate-100">404</h1>
        <p className="mt-4 text-slate-400">We couldn't find the page you're looking for.</p>
        <Link to="/dashboard" className="mt-8 inline-flex rounded-full bg-sky-500 px-6 py-3 text-white transition hover:bg-sky-400">
          Return to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
