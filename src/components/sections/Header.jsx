import { useEffect, useState } from "react";
import logo from "../../../src/assets/logo2.png";
import { ForgotPasswordForm } from "../forms/ForgetPasswordForm";
import { LoginForm } from "../forms/LoginForm";
import { SignupForm } from "../forms/SignUpForm";
import { Modal } from "../modal/modal";
import Button from "../ui/button";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("login"); // "login" | "signup" | "forgot"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderForm = () => {
    switch (activeForm) {
      case "login":
        return <LoginForm onSwitch={setActiveForm} />;
      case "signup":
        return <SignupForm onSwitch={setActiveForm} />;
      case "forgot":
        return <ForgotPasswordForm onSwitch={setActiveForm} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-md shadow-md"
            : "bg-white/95 border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-1">
              <img
                src={logo}
                alt="Runner City Housing"
                className="h-14 md:h-16 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg md:text-xl leading-none text-gray-900">
                  Runner City
                </span>
                <span className="text-xs md:text-sm text-gray-500">
                  Housing Management
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-gray-700">
              <a
                href="#features"
                className="text-sm font-medium hover:text-emerald-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-sm font-medium hover:text-emerald-600 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium hover:text-emerald-600 transition-colors"
              >
                Testimonials
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="md"
                className="hidden sm:inline-flex border-gray-300 hover:border-emerald-500 hover:text-emerald-600 transition-all"
                onClick={() => {
                  setActiveForm("signup");
                  setIsModalOpen(true);
                }}
              >
                Request Access
              </Button>
              <Button
                size="md"
                className="bg-gradient-to-r from-teal-900 to-emerald-500 text-white shadow-lg hover:from-emerald-600 hover:to-emerald-400 transition-all"
                onClick={() => {
                  setActiveForm("login");
                  setIsModalOpen(true);
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal (shared for all forms) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
      >
        {renderForm()}
      </Modal>
    </>
  );
};
