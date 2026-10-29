import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
        <Link to="/" className="text-lg font-bold text-slate-900">
          Project<span className="text-violet-600">Eval AI</span>
        </Link>

        <p className="text-center text-sm text-slate-500">
          Evaluate smarter. Build better projects.
        </p>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} ProjectEval AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
