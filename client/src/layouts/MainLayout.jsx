import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Navbar />
      <main className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-slate-200/60 bg-white/80 p-6 shadow-glass backdrop-blur-xl transition-colors duration-500 dark:border-slate-700/50 dark:bg-slate-950/80 sm:p-10">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
