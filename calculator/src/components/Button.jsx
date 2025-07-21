const CalculatorButton = ({ onClick, children, className = '', disabled = false }) => {

  const baseClasses = "flex items-center justify-center h-16 text-2xl font-semibold rounded-2xl shadow-md border border-white/10 transition-all duration-200 ease-in-out";
  
  const interactiveClasses = "transform hover:scale-102 hover:shadow-lg active:scale-95";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={() => onClick(children)}
      disabled={disabled}
      className={`${baseClasses} ${interactiveClasses} ${className} ${disabled ? disabledClasses : ''}`}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;

