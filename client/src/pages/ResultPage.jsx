import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { fetchMyResults } from '../services/resultService';

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const data = await fetchMyResults();
      setResults(data);
    } catch (error) {
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const latest = results[0];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-bg">
      <div className="main-card">
        <h2 className="mb-10 text-2xl font-semibold">
          Congratulations
        </h2>

        <div className="space-y-10">
          {latest?.details?.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  Corrected statement {index + 1}
                </p>

                <span
                  className={
                    item.isCorrect
                      ? 'correct'
                      : 'incorrect'
                  }
                >
                  {item.isCorrect ? '✔' : '✖'}
                </span>
              </div>

              <div className="mt-3 border-b border-white/70" />
            </div>
          ))}
        </div>

        <div className="mt-14 text-center text-lg">
          You successfully corrected{' '}
          <span className="correct">
            {latest?.score}/
            {latest?.totalQuestions}
          </span>{' '}
          errors.
        </div>
      </div>
    </div>
  );
};

export default ResultPage;