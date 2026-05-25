import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../features/api/authApi";
import { setCredentials } from "../../features/auth/authSlice";

export const SignupForm = ({ onSwitch, onSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plot_no: "",
    password: "",
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError(null); // clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form).unwrap(); // unwrapping RTK Query result
      dispatch(setCredentials({ user: res.user }));

      toast.success(t("signup.signupSuccess"));

      if (onSuccess) onSuccess(); // parent can close modal
      navigate("/"); // redirect to home page
    } catch (err) {
      console.error("Signup error:", err);
      // RTK Query error might be nested differently
      const message =
        err?.data?.message || err?.error || t("signup.signupFailed");
      setFormError(message);
      toast.error(message);
    }
  };

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {t("signup.title")}
        </h2>
        <p className="text-gray-500 text-sm">{t("signup.subtitle")}</p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {[
          { label: t("signup.fullName"), name: "name", type: "text", placeholder: t("signup.fullNamePlaceholder") },
          { label: t("signup.emailLabel"), name: "email", type: "email", placeholder: t("signup.emailPlaceholder") },
          { label: t("signup.phoneLabel"), name: "phone", type: "tel", placeholder: t("signup.phonePlaceholder") },
          { label: t("signup.plotLabel"), name: "plot_no", type: "text", placeholder: t("signup.plotPlaceholder") },
          { label: t("signup.passwordLabel"), name: "password", type: "password", placeholder: t("signup.passwordPlaceholder") },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                outline-none transition-all text-gray-900 hover:shadow-md"
            />
          </div>
        ))}

        {/* Error */}
        {formError && (
          <p className="text-red-500 text-sm text-center mt-1">{formError}</p>
        )}

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 
            text-white font-semibold hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-60"
        >
          {isLoading ? t("signup.creatingAccount") : t("signup.signUp")}
        </button>
      </form>

      {/* Bottom Link */}
      <div className="text-center text-sm mt-4">
        <span>{t("signup.alreadyHaveAccount")}</span>
        <button
          onClick={() => onSwitch("login")}
          className="text-emerald-600 font-medium hover:underline"
        >
          {t("signup.login")}
        </button>
      </div>
    </div>
  );
};
