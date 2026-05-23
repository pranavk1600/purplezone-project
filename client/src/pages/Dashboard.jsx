import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import StatementCard from '../components/StatementCard';
import Loader from '../components/Loader';
import {
  fetchStatements,
  saveStatementSubmission,
} from '../services/statementService';

import { submitResults } from '../services/resultService';

const Dashboard = () => {
  const navigate = useNavigate();

  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    loadStatements();
  }, []);

  const loadStatements = async () => {
    try {
      const data = await fetchStatements();

      setStatements(
        data.map((item) => ({
          ...item,
          savedAnswer: item.savedAnswer || '',
        }))
      );
    } catch (error) {
      toast.error('Failed to load statements');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id, value) => {
    setStatements((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, savedAnswer: value }
          : item
      )
    );
  };

  const handleSave = async (statement) => {
    try {
      await saveStatementSubmission(
        statement.id,
        statement.savedAnswer
      );

      toast.success('Saved');
    } catch (error) {
      toast.error('Save failed');
    }
  };

  const handleSubmit = async () => {
    try {
      await submitResults();
      navigate('/results');
    } catch (error) {
      toast.error('Submit failed');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-bg">
      <div className="main-card">
        <h2 className="mb-10 text-2xl font-semibold">
          Test 1
        </h2>

        <div className="space-y-10">
          {statements.map((statement) => (
            <StatementCard
              key={statement.id}
              statement={statement}
              open={openId === statement.id}
              onEdit={() =>
                setOpenId(
                  openId === statement.id
                    ? null
                    : statement.id
                )
              }
              onChange={(value) =>
                handleChange(statement.id, value)
              }
              onSave={() => handleSave(statement)}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSubmit}
            className="simple-btn"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;