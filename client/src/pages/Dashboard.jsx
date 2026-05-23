import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import StatementCard from '../components/StatementCard';
import AnalyticsCard from '../components/AnalyticsCard';
import Loader from '../components/Loader';
import { fetchStatements, saveStatementSubmission } from '../services/statementService';
import { submitResults } from '../services/resultService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [openId, setOpenId] = useState(null);

  const loadStatements = async () => {
    try {
      setLoading(true);
      const data = await fetchStatements();
      setStatements(data.map((statement) => ({ ...statement, savedAnswer: statement.savedAnswer || '' })));
    } catch (error) {
      toast.error('Unable to load grammar statements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatements();
  }, []);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const handleChange = (id, value) => {
    setStatements((current) => current.map((statement) => statement.id === id ? { ...statement, savedAnswer: value } : statement));
  };

  const handleSave = async (statement) => {
    try {
      setSaving((prev) => ({ ...prev, [statement.id]: true }));
      await saveStatementSubmission(statement.id, statement.savedAnswer);
      setStatements((current) => current.map((item) => item.id === statement.id ? { ...item, savedAnswer: statement.savedAnswer, status: 'Saved' } : item));
      toast.success('Correction saved successfully.');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Could not save correction.');
    } finally {
      setSaving((prev) => ({ ...prev, [statement.id]: false }));
    }
  };

  const handleSubmitAll = async () => {
    try {
      setLoading(true);
      setStatements([]);
      await submitResults();
      await loadStatements();
      toast.success('New grammar challenge loaded!');
      navigate('/results');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const savedCount = statements.filter((statement) => statement.savedAnswer.trim().length > 0).length;
  const unsavedCount = statements.length - savedCount;

  return (
    <div className="space-y-8 text-slate-900 dark:text-slate-100">
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="glass-card p-8 shadow-glass">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Welcome to your training panel</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">Grammar Correction Practice</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Review sample sentences with punctuation and grammar mistakes, edit them, save corrections, and then submit answers for instant scoring.
          </p>
          <button
            onClick={handleSubmitAll}
            disabled={!statements.length || savedCount === 0 || loading}
            className="mt-8 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Submitting...' : 'Submit Answers & View Results'}
          </button>
        </div>
        <div className="grid gap-5">
          <AnalyticsCard label="Total Statements" value={statements.length} accent="text-sky-300" />
          <AnalyticsCard label="Saved Answers" value={savedCount} accent="text-emerald-300" />
          <AnalyticsCard label="Pending Edits" value={unsavedCount} accent="text-amber-300" />
        </div>
      </div>

      {loading ? (
        <Loader label="Loading statements..." />
      ) : (
        <div className="grid gap-6">
          {statements.map((statement) => (
            <StatementCard
              key={statement.id}
              statement={statement}
              open={openId === statement.id}
              onEdit={() => handleToggle(statement.id)}
              onChange={(value) => handleChange(statement.id, value)}
              onSave={() => handleSave(statement)}
              saving={saving[statement.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
