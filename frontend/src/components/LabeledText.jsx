const LabeledText = ({ label, children }) => {
  return (
    <div className="relative pt-3">
      <div className="absolute top-0 left-0 text-blue-400 font-bold text-xs px-1">{label}:</div>
      <div className="px-2 pt-1">{children}</div>
    </div>
  );
};

export default LabeledText;
