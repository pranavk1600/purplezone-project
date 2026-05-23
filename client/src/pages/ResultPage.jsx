import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AnalyticsCard from '../components/AnalyticsCard';
import Loader from '../components/Loader';
import { fetchMyResults } from '../services/resultService';
import { useTheme } from '../context/ThemeContext';

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        const data = await fetchMyResults();
        setResults(data);
      } catch (error) {
        toast.error('Unable to load results.');
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, []);

  const latest = results[0];

  return (
    <div className={`space-y-8 transition-colors duration-500 ${isDark ? 'dark' : 'bg-gray-100'}`}>
      <div
        className={`rounded-[2rem] border p-8 transition-colors duration-500 ${
          isDark
            ? 'bg-slate-950/80 border-slate-700/60 text-slate-100 shadow-glass'
            : 'bg-white border-gray-200 text-gray-900 shadow-md'
        }`}
      >
        <p className={`text-sm uppercase tracking-[0.28em] ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          Performance summary
        </p>
        <h1 className={`mt-4 text-4xl font-semibold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
          Result analysis
        </h1>
        <p className={`mt-4 max-w-2xl ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          Your latest submission is evaluated by total score, accuracy and the grammar mistakes you corrected. Review how many answers matched the target correction.
        </p>
      </div>

      {loading ? (
        <Loader label="Loading results..." />
      ) : !latest ? (
        <div
          className={`rounded-[2rem] border p-10 text-center transition-colors duration-500 ${
            isDark
              ? 'bg-slate-950/80 border-slate-700/60 text-slate-300 shadow-glass'
              : 'bg-white border-gray-200 text-gray-700 shadow-md'
          }`}
        >
          No results yet. Complete a test on the dashboard first.
        </div>
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-3">
            {[
              { label: 'Score', value: `${latest.score}/${latest.totalQuestions}`, accent: 'text-sky-500 dark:text-sky-300' },
              { label: 'Accuracy', value: `${latest.accuracy}%`, accent: 'text-emerald-500 dark:text-emerald-300' },
              { label: 'Attempted', value: latest.totalQuestions, accent: 'text-amber-500 dark:text-amber-300' }
            ].map((card) => (
              <div
                key={card.label}
                className={`rounded-[2rem] border p-1 transition-colors duration-500 ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-700/60 shadow-glass'
                    : 'bg-white border-gray-200 shadow-md'
                }`}
              >
                <AnalyticsCard {...card} />
              </div>
            ))}
          </div>

          <div className="grid gap-6">
            {latest.details.map((item) => (
              <div
                key={item.statement}
                className={`rounded-[2rem] border p-6 transition-colors duration-500 ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-700/60 text-slate-100 shadow-glass'
                    : 'bg-white border-gray-200 text-gray-900 shadow-md'
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <div className={`text-sm uppercase tracking-[0.24em] ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      Original
                    </div>
                    <p className={`mt-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{item.originalText}</p>
                  </div>
                  <span
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                      item.isCorrect
                        ? isDark
                          ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/20'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : isDark
                        ? 'bg-rose-500/15 text-rose-200 border border-rose-500/20'
                        : 'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {item.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div
                    className={`rounded-3xl p-4 transition-colors duration-500 ${
                      isDark
                        ? 'bg-slate-950/80 text-slate-300 ring-1 ring-slate-700/50'
                        : 'bg-white text-gray-900 border border-gray-200 ring-1 ring-gray-200'
                    }`}
                  >
                    <div className={`text-xs uppercase tracking-[0.22em] ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                      Your answer
                    </div>
                    <p className={`mt-3 text-sm ${isDark ? 'text-slate-100' : 'text-gray-700'}`}>
                      {item.correctedAnswer || 'No answer provided'}
                    </p>
                  </div>
                  <div
                    className={`rounded-3xl p-4 transition-colors duration-500 ${
                      isDark
                        ? 'bg-slate-950/80 text-slate-300 ring-1 ring-slate-700/50'
                        : 'bg-white text-gray-900 border border-gray-200 ring-1 ring-gray-200'
                    }`}
                  >
                    <div className={`text-xs uppercase tracking-[0.22em] ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                      Expected answer
                    </div>
                    <p className={`mt-3 text-sm ${isDark ? 'text-slate-100' : 'text-gray-700'}`}>{item.correctAnswer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultPage;
