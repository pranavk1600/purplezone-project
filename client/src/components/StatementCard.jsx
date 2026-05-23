const StatementCard = ({
  statement,
  open,
  onEdit,
  onChange,
}) => {
  return (
    <div>
      {!open ? (
        <div>
          <p className="mb-3 text-sm text-white">
            {statement.text}
          </p>

          <div className="border-b border-white/70" />

          <div className="mt-5 flex justify-center">
            <button
              onClick={onEdit}
              className="simple-btn"
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={statement.savedAnswer}
            onChange={(e) =>
              onChange(e.target.value)
            }
            className="simple-input resize-none"
            rows={2}
            placeholder="Write correction..."
          />

          <div className="mt-5 flex justify-center">
            <button
              onClick={onEdit}
              className="simple-btn"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatementCard;