import { useEffect, useRef, useState } from "react";
import heroImage from "../../assets/city2.jpg";
import { ForgotPasswordForm } from "../forms/ForgetPasswordForm";
import { LoginForm } from "../forms/LoginForm";
import { SignupForm } from "../forms/SignUpForm";
import { Modal } from "../modal/modal";
import Button from "../ui/button";


export const Hero = () => {
  const bgRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

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

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        // Parallax effect for the background
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Darker Green Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-emerald-900/75 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        {/* Tagline Chip */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-700/70 backdrop-blur-md border border-emerald-500/40 rounded-full text-white text-sm font-semibold mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Welcome to Runner City Housing
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
          Smarter Living
          <span className="block bg-gradient-to-r from-emerald-400/95 via-emerald-300/80 to-white/80 bg-clip-text text-transparent">
            Together
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
          From fees to events, payroll, and AI-powered security — experience
          transparent, simple, and intelligent community management.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="hero"
            size="lg"
            className="min-w-[220px] shadow-xl hover:shadow-2xl text-white"
            onClick = {()=> {setActiveForm("login"); setIsModalOpen(true)}}
          >
            Login Now
          </Button>
          <Button
            size="lg"
            className="min-w-[220px] bg-white/20 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/30 transition-all"
          >
            Explore Features
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </div>

      {/* Modal (shared for all forms) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
      >
        {renderForm()}
      </Modal>
    </section>
  );
};