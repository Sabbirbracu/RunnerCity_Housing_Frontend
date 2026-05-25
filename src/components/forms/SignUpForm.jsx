import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Home,
  Key,
  Loader2,
  User,
  Users,
} from "lucide-react";
import { useSignupMutation, useLazyCheckPlotQuery } from "../../features/api/authApi";

const ROLE_ICONS = {
  full_owner: Building2,
  flat_owner: Home,
  family_resident: Users,
  tenant: Key,
  caretaker: User,
};

const ROLE_KEYS = ["full_owner", "flat_owner", "family_resident", "tenant", "caretaker"];
const RELATIONSHIP_KEYS = ["Son", "Daughter", "Wife", "Husband", "Brother", "Other"];

export const SignupForm = ({ onSwitch, onSuccess }) => {
  const { t } = useTranslation();
  const [signup, { isLoading }] = useSignupMutation();
  const [checkPlot] = useLazyCheckPlotQuery();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    plot_no: "",
    role: "",
    flat_count: "",
    relationship: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [plotVerifying, setPlotVerifying] = useState(false);
  const [plotInfo, setPlotInfo] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  // Determine if step 3 is needed based on role
  const needsStep3 = () => {
    return ["flat_owner", "family_resident", "caretaker"].includes(form.role);
  };

  const goNext = () => {
    if (step === 2 && !needsStep3()) {
      setStep(4);
    } else {
      setStep((s) => Math.min(s + 1, 5));
    }
  };

  const goBack = () => {
    if (step === 4 && !needsStep3()) {
      setStep(2);
    } else {
      setStep((s) => Math.max(s - 1, 1));
    }
  };

  // Helper: suggest corrected plot number (e.g., D-02 → D-2, but C-02 stays C-02)
  const getSuggestedPlot = (plotNo) => {
    const match = plotNo.match(/^([A-Za-z])-0(\d)$/);
    if (match) {
      const prefix = match[1].toUpperCase();
      if (prefix === "C") return null;
      return `${prefix}-${match[2]}`;
    }
    return null;
  };

  // Step 1: Validate plot number via backend
  const validateStep1 = async () => {
    if (!form.plot_no.trim()) {
      setErrors({ plot_no: t("signup.step1.required") });
      return false;
    }
    setPlotVerifying(true);
    try {
      const result = await checkPlot(form.plot_no.trim()).unwrap();
      setPlotVerifying(false);
      if (!result.exists) {
        const suggestion = getSuggestedPlot(form.plot_no.trim());
        if (suggestion) {
          setErrors({ plot_no: t("signup.step1.invalid"), plot_suggestion: suggestion });
        } else {
          setErrors({ plot_no: t("signup.step1.invalid") });
        }
        return false;
      }
      setPlotInfo(result);
      return true;
    } catch (err) {
      setPlotVerifying(false);
      if (err?.status === 404) {
        const suggestion = getSuggestedPlot(form.plot_no.trim());
        if (suggestion) {
          setErrors({ plot_no: t("signup.step1.invalid"), plot_suggestion: suggestion });
        } else {
          setErrors({ plot_no: t("signup.step1.invalid") });
        }
        return false;
      }
      console.warn("Plot check failed, proceeding:", err);
      return true;
    }
  };

  // Step 2: Validate role selection — block duplicate owner requests
  const validateStep2 = () => {
    if (!form.role) {
      setErrors({ role: t("signup.step2.selectRole") });
      return false;
    }
    if (form.role === "full_owner" || form.role === "flat_owner") {
      if (plotInfo?.has_owner) {
        setErrors({ role: t("signup.step2.ownerExists") });
        return false;
      }
      if (plotInfo?.has_pending_owner) {
        setErrors({ role: t("signup.step2.pendingOwner") });
        return false;
      }
    }
    return true;
  };

  // Step 3: Validate conditional details
  const validateStep3 = () => {
    if (form.role === "flat_owner" && (!form.flat_count || parseInt(form.flat_count) < 1)) {
      setErrors({ flat_count: t("signup.step3.flatCountRequired") });
      return false;
    }
    if ((form.role === "family_resident" || form.role === "caretaker") && !form.relationship) {
      setErrors({ relationship: t("signup.step3.relationshipRequired") });
      return false;
    }
    return true;
  };

  // Step 4: Validate personal info
  const validateStep4 = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t("signup.step4.nameRequired");
    if (!form.phone.trim()) newErrors.phone = t("signup.step4.phoneRequired");
    if (!form.email.trim()) newErrors.email = t("signup.step4.emailRequired");
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // Step 5: Validate password
  const validateStep5 = () => {
    const newErrors = {};
    if (!form.password || form.password.length < 8) {
      newErrors.password = t("signup.step5.passwordMin");
    }
    if (form.password !== form.confirm_password) {
      newErrors.confirm_password = t("signup.step5.confirmMismatch");
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    setErrors({});
    let valid = false;
    switch (step) {
      case 1:
        valid = await validateStep1();
        break;
      case 2:
        valid = validateStep2();
        break;
      case 3:
        valid = validateStep3();
        break;
      case 4:
        valid = validateStep4();
        break;
      default:
        valid = true;
    }
    if (valid) goNext();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep5()) return;

    const payload = {
      plot_no: form.plot_no.trim(),
      role: form.role,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    if (form.role === "flat_owner") payload.flat_count = parseInt(form.flat_count);
    if (form.role === "family_resident" || form.role === "caretaker") {
      payload.relationship_type = form.relationship.toLowerCase();
    }

    try {
      await signup(payload).unwrap();
      toast.success(t("signup.success"));
      if (onSuccess) onSuccess();
    } catch (err) {
      const message = err?.data?.message || err?.error || t("signup.failed");
      toast.error(message);
    }
  };

  // Progress bar
  const totalSteps = needsStep3() ? 5 : 4;
  const currentProgress = needsStep3() ? step : step > 3 ? step - 1 : step;
  const progressPercent = (currentProgress / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-900">{t("signup.title")}</h2>
        <p className="text-gray-500 text-sm">{t("signup.subtitle")}</p>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-right">
          {t("signup.stepOf", { current: currentProgress, total: totalSteps })}
        </p>
      </div>

      {/* Step Content */}
      <form onSubmit={handleSubmit} className="min-h-[280px] flex flex-col">
        <div className="flex-1">
          {/* STEP 1: Plot Number */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-3">
                  <Building2 className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t("signup.step1.title")}</h3>
                <p className="text-sm text-gray-500 mt-1">{t("signup.step1.description")}</p>
              </div>
              <div>
                <input
                  type="text"
                  value={form.plot_no}
                  onChange={(e) => handleChange("plot_no", e.target.value)}
                  placeholder={t("signup.step1.placeholder")}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white
                    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    outline-none transition-all text-gray-900 text-center text-lg font-medium
                    placeholder:text-gray-400 placeholder:font-normal"
                  autoFocus
                />
                {errors.plot_no && (
                  <p className="text-red-500 text-sm mt-2 text-center">{errors.plot_no}</p>
                )}
                {errors.plot_suggestion && (
                  <button
                    type="button"
                    onClick={() => {
                      handleChange("plot_no", errors.plot_suggestion);
                      setErrors({});
                    }}
                    className="mt-2 w-full text-sm text-center px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    {t("signup.step1.suggestion", { plot: errors.plot_suggestion }).replace(/<bold>(.*?)<\/bold>/, "$1")}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Role Selection */}
          {step === 2 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{t("signup.step2.title")}</h3>
                <p className="text-sm text-gray-500">{t("signup.step2.forPlot")} <span className="font-medium text-emerald-700">{form.plot_no}</span></p>
              </div>
              <div className="space-y-2">
                {ROLE_KEYS.map((roleKey) => {
                  const Icon = ROLE_ICONS[roleKey];
                  const isSelected = form.role === roleKey;
                  return (
                    <button
                      key={roleKey}
                      type="button"
                      onClick={() => handleChange("role", roleKey)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left
                        ${isSelected
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                        ${isSelected ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isSelected ? "text-emerald-800" : "text-gray-800"}`}>
                          {t(`signup.step2.roles.${roleKey}`)}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{t(`signup.step2.roles.${roleKey}_desc`)}</p>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {errors.role && (
                <div className={`text-sm text-center mt-2 px-4 py-2.5 rounded-xl ${
                  errors.role === t("signup.step2.pendingOwner")
                    ? "bg-amber-50 border border-amber-200 text-amber-700"
                    : errors.role === t("signup.step2.ownerExists")
                    ? "bg-red-50 border border-red-200 text-red-600"
                    : "text-red-500"
                }`}>
                  {errors.role}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Conditional Details */}
          {step === 3 && needsStep3() && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{t("signup.step3.title")}</h3>
                <p className="text-sm text-gray-500">{t("signup.step3.description")}</p>
              </div>

              {/* Flat Owner → Number of flats */}
              {form.role === "flat_owner" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("signup.step3.flatCount")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.flat_count}
                    onChange={(e) => handleChange("flat_count", e.target.value)}
                    placeholder={t("signup.step3.flatCountPlaceholder")}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white
                      focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                      outline-none transition-all text-gray-900"
                    autoFocus
                  />
                  {errors.flat_count && (
                    <p className="text-red-500 text-sm mt-2">{errors.flat_count}</p>
                  )}
                </div>
              )}

              {/* Family/Resident or Caretaker → Relationship */}
              {(form.role === "family_resident" || form.role === "caretaker") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("signup.step3.relationship")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RELATIONSHIP_KEYS.map((rel) => (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => handleChange("relationship", rel)}
                        className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all
                          ${form.relationship === rel
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-100 bg-white text-gray-700 hover:border-gray-200"
                          }`}
                      >
                        {t(`signup.step3.relationships.${rel}`)}
                      </button>
                    ))}
                  </div>
                  {errors.relationship && (
                    <p className="text-red-500 text-sm mt-2">{errors.relationship}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Personal Info */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{t("signup.step4.title")}</h3>
                <p className="text-sm text-gray-500">{t("signup.step4.description")}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("signup.step4.nameLabel")}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder={t("signup.step4.namePlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    outline-none transition-all text-gray-900"
                  autoFocus
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("signup.step4.phoneLabel")}</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder={t("signup.step4.phonePlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    outline-none transition-all text-gray-900"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("signup.step4.emailLabel")}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder={t("signup.step4.emailPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    outline-none transition-all text-gray-900"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
          )}

          {/* STEP 5: Password */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{t("signup.step5.title")}</h3>
                <p className="text-sm text-gray-500">{t("signup.step5.description")}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("signup.step5.passwordLabel")}</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder={t("signup.step5.passwordPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    outline-none transition-all text-gray-900"
                  autoFocus
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("signup.step5.confirmLabel")}</label>
                <input
                  type="password"
                  value={form.confirm_password}
                  onChange={(e) => handleChange("confirm_password", e.target.value)}
                  placeholder={t("signup.step5.confirmPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    outline-none transition-all text-gray-900"
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("signup.nav.back")}
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={plotVerifying}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700
                text-white text-sm font-semibold hover:from-emerald-700 hover:to-emerald-800
                transition-all shadow-sm hover:shadow-md disabled:opacity-60"
            >
              {plotVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("signup.nav.verifying")}
                </>
              ) : (
                <>
                  {t("signup.nav.next")}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700
                text-white text-sm font-semibold hover:from-emerald-700 hover:to-emerald-800
                transition-all shadow-sm hover:shadow-md disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("signup.nav.submitting")}
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {t("signup.nav.submit")}
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Bottom Link */}
      <div className="text-center text-sm border-t border-gray-100 pt-4">
        <span className="text-gray-500">{t("signup.alreadyHaveAccount")} </span>
        <button
          onClick={() => onSwitch("login")}
          className="text-emerald-700 font-medium hover:underline"
        >
          {t("signup.login")}
        </button>
      </div>
    </div>
  );
};
