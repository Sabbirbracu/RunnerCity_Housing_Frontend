export const ForgotPasswordForm = ({ onSwitch }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-gray-600 mt-2">
          Enter your email to receive reset instructions
        </p>
      </div>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          Send Reset Link
        </button>
      </form>

      <div className="text-center text-sm">
        <button
          onClick={() => onSwitch("login")}
          className="text-emerald-600 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};
