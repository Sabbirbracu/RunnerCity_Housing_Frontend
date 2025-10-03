export const CTA = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] opacity-60" />

      {/* Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        {/* New floating shapes behind buttons */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-white/5 rounded-full blur-2xl animate-pulse-slower" />
        <div className="absolute bottom-24 right-1/3 w-56 h-56 bg-white/5 rounded-full blur-2xl animate-pulse-slower" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-semibold mb-6">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Ready to Transform Your Community?
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Join Our Smarter,
          <span className="block bg-gradient-to-r from-white/95 to-white/70 bg-clip-text text-transparent">
            Transparent Community
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience the future of community management with RCHMS.
        </p>

        {/* CTA Buttons */}
        <div className="relative flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button className="min-w-[220px] h-14 px-8 bg-white text-emerald-700 font-semibold text-lg rounded-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all z-10">
            Login Now
          </button>
          <button className="min-w-[220px] h-14 px-8 bg-white/20 border-2 border-white/40 text-white font-semibold text-lg rounded-lg backdrop-blur-md shadow-xl hover:bg-white/30 transition-all z-10">
            Request Access
          </button>
        </div>
      </div>
    </section>
  );
};
