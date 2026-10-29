import React from "react";
import { Link } from "react-router-dom";

const DashboardCards = () => {
  return (
    <section className="bg-white px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">

        {/* Student Dashboard */}
        <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-2xl">
              🎓
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Student Dashboard
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Submit your project, receive an AI-powered evaluation, and
                discover ways to improve your work.
              </p>

              <Link
                to="/student"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-4 focus:ring-violet-200"
              >
                Submit Project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Admin Dashboard */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl">
              📊
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Admin Dashboard
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review submitted projects, explore AI-generated evaluations,
                and compare project scores.
              </p>

              <Link
                to="/admin"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                View Dashboard <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DashboardCards;
