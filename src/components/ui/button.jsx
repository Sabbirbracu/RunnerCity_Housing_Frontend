const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default:
      "text-white shadow-md hover:shadow-lg transition-all",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-emerald-700 bg-transparent text-emerald-700 hover:bg-emerald-700 hover:text-white transition-all shadow-sm",
    secondary:
      "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 shadow-sm",
    ghost:
      "bg-transparent text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors",
    link:
      "text-emerald-700 underline-offset-4 hover:underline hover:text-emerald-800",
    hero:
      "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all font-semibold",
    cta:
      "bg-emerald-700 text-white hover:bg-emerald-800 shadow-md hover:shadow-lg transition-all font-semibold",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm rounded-md",
    md: "h-10 px-6 text-lg rounded-lg",
    lg: "h-11 px-8 text-lg rounded-lg",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
