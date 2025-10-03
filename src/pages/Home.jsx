import { Benefits } from "../components/sections/Benefits";
import { CTA } from "../components/sections/CTA";
import { DemoSection } from "../components/sections/DemoSection";
import { Features } from "../components/sections/Features";
import { Footer } from "../components/sections/Footer";
import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { ProblemSolution } from "../components/sections/ProblemSolution";
import { Testimonials } from "../components/sections/Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSolution />
      <Features />
      <DemoSection />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
    
    </div>
  );
};

export default Home;
