import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-violet-50/40 to-purple-100/60">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-6">

        {/* LEFT: Hero content */}
        <div className="min-w-0 text-center lg:text-left">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <span>✨</span>
            AI-Powered Project Evaluation
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
            Evaluate Your Projects
            <span className="mt-2 block bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              With Artificial Intelligence
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0">
            Submit your project, receive an AI-generated score, and discover
            strengths, improvements, and smart suggestions to make your
            project better.
          </p>

          {/* Dashboard options */}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-xl">

            {/* Student option */}
            <Link
              to="/student"
              className="group flex items-center gap-3 rounded-xl border border-violet-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-400 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-violet-200"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xl">
                🎓
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-slate-900">
                  Student Dashboard
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Submit and evaluate your project
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-violet-700">
                  Get Started
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>

            {/* Admin option */}
            <Link
              to="/admin"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                📊
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-slate-900">
                  Admin Dashboard
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Review projects and rankings
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-slate-800">
                  View Projects
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>

          </div>

          {/* Additional action */}
          <div className="mt-5">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-violet-700"
            >
              Discover How It Works
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          {/* Feature highlights */}
          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 lg:justify-start">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                ✓
              </span>
              AI Feedback
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                ✦
              </span>
              Smart Scoring
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                💡
              </span>
              Improvement Tips
            </div>
          </div>
        </div>

        {/* RIGHT: AI Project Review illustration */}
        <div className="mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative rounded-3xl border border-violet-100 bg-white/90 p-4 shadow-xl shadow-violet-200/40 sm:p-6">

            {/* Card header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
                  ✨
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">
                    AI Project Review
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Your project evaluation
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                AI Powered
              </span>
            </div>

            {/* Score */}
            <div className="my-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-100/80 p-4 sm:p-6">
              <p className="text-center text-sm font-semibold text-violet-700">
                Overall Project Score
              </p>

              <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
                <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-[6px] border-violet-500 bg-white shadow-sm">
                  <span className="text-3xl font-extrabold text-slate-900">
                    92
                  </span>
                  <span className="text-xs text-slate-500">/100</span>
                </div>

                <div className="text-center sm:text-left">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    ✓ Great progress
                  </span>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Discover strengths and opportunities to improve.
                  </p>
                </div>
              </div>
            </div>

            {/* Evaluation highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-lg text-emerald-600">
                  ✓
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Project Strengths
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Identify what works well
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-600">
                  Insights
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-lg">
                  💡
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Areas to Improve
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Find opportunities for growth
                  </p>
                </div>
                <span className="text-xs font-semibold text-amber-600">
                  Tips
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-lg text-violet-600">
                  ✦
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Smart Suggestions
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Plan your next improvements
                  </p>
                </div>
                <span className="text-xs font-semibold text-violet-600">
                  AI Insights
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Turning project ideas into better outcomes
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
