import { motion } from 'framer-motion';

import openIcon from '../assets/Group 3.png';
import closeIcon from '../assets/Group 5.png';

const StatementCard = ({
  statement,
  open,
  onEdit,
  onSave,
  onChange,
  saving,
}) => {
  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className="
        rounded-[32px]
        border border-white/10
        bg-[#071226]/95
        p-6
        shadow-[0_8px_35px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
        transition-all duration-300
      "
    >
      {/* Top Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left */}
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Statement
          </div>

          <p className="mt-3 text-xl leading-8 font-medium text-white">
            {statement.text}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          
          {/* Status */}
          <span
            className="
              rounded-full
              border border-cyan-400/20
              bg-cyan-400/10
              px-4 py-2
              text-xs font-semibold
              uppercase tracking-[0.22em]
              text-cyan-200
            "
          >
            {statement.status}
          </span>

          {/* Edit / Close */}
          <button
            onClick={onEdit}
            className="
              flex items-center gap-2
              rounded-full
              bg-gradient-to-r
              from-sky-500
              to-cyan-400
              px-5 py-2
              text-sm font-semibold
              text-slate-950
              transition-all duration-300
              hover:scale-105
            "
          >
            <img
              src={open ? closeIcon : openIcon}
              alt="action"
              className="h-5 w-5 object-contain"
            />

            {open ? 'Close' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Open Area */}
      {open && (
        <div className="mt-8 space-y-5">

          {/* Label */}
          <label className="block text-sm font-medium text-slate-300">
            Correct the sentence
          </label>

          {/* Textarea */}
          <textarea
            value={statement.savedAnswer}
            onChange={(e) => onChange(e.target.value)}
            className="
              w-full resize-none
              rounded-[28px]
              border border-white/10
              bg-[#020817]
              p-5
              text-white
              outline-none
              transition-all duration-300
              placeholder:text-slate-500
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/30
            "
            rows={4}
            placeholder="Write the corrected sentence..."
          />

          {/* Bottom */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            
            <p className="text-sm text-slate-400">
              Expected correction will be saved to your session.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3">

              {/* OPEN */}
              <button
                className="
                  flex items-center gap-2
                  rounded-full
                  border border-cyan-400/20
                  bg-cyan-400/10
                  px-4 py-2
                  text-sm font-semibold
                  tracking-wide text-cyan-200
                  transition-all duration-300
                  hover:bg-cyan-400/20
                "
              >
                <img
                  src={openIcon}
                  alt="Open"
                  className="h-5 w-5 object-contain"
                />

                OPEN
              </button>

              {/* SAVE */}
              <button
                onClick={onSave}
                disabled={saving}
                className="
                  rounded-full
                  bg-gradient-to-r
                  from-purple-600
                  via-fuchsia-500
                  to-pink-500
                  px-5 py-2
                  text-sm font-semibold
                  text-white
                  shadow-lg shadow-purple-900/40
                  transition-all duration-300
                  hover:scale-105
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {saving ? 'Saving...' : 'Save Correction'}
              </button>

              {/* CLOSE */}
              <button
                onClick={onEdit}
                className="
                  flex items-center gap-2
                  rounded-full
                  border border-red-400/20
                  bg-red-500/10
                  px-4 py-2
                  text-sm font-semibold
                  text-red-200
                  transition-all duration-300
                  hover:bg-red-500/20
                "
              >
                <img
                  src={closeIcon}
                  alt="Close"
                  className="h-5 w-5 object-contain"
                />

                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.article>
  );
};

export default StatementCard;