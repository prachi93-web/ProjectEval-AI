import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DashboardCards from "../components/DashboardCards";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Landing;
