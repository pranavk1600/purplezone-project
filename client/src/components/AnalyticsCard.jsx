const AnalyticsCard = ({ label, value, accent }) => {
  return (
    <div className="glass-card p-6 text-slate-900 dark:text-slate-100">
      <div className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{label}</div>
      <div className={`mt-4 text-3xl font-semibold ${accent || 'text-sky-500 dark:text-sky-300'}`}>{value}</div>
    </div>
  );
};

export default AnalyticsCard;
