const Loader = ({ label = 'Loading...' }) => {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-slate-700/60 bg-slate-900/70 p-10 shadow-glass">
      <div className="flex items-center gap-4 text-slate-300">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400"></div>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default Loader;
