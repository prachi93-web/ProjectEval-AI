import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-violet-100 bg-white/95 px-5 py-4 shadow-sm backdrop-blur-md sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
        >
          Project<span className="text-violet-600">Eval AI</span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 sm:gap-6 sm:text-sm">
          <Link
            to="/"
            className="transition-colors hover:text-violet-600"
          >
            Home
          </Link>

          <a
            href="/#how-it-works"
            className="whitespace-nowrap transition-colors hover:text-violet-600"
          >
            How It Works
          </a>

          <a
            href="/#faq"
            className="transition-colors hover:text-violet-600"
          >
            FAQ
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;