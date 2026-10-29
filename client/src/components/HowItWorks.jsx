import React from "react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>

          <p className="mt-3 text-slate-600">
            Evaluate your project in three simple steps.
          </p>
        </div>

        {/* Three Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-600">
              1
            </div>

            <h3 className="mt-4 text-lg font-semibold">Submit Your Project</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your project details, description, technologies, and GitHub
              URL.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-600">
              2
            </div>

            <h3 className="mt-4 text-lg font-semibold">AI Evaluation</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              AI evaluates the submitted project details and generates a score
              and feedback.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-600">
              3
            </div>

            <h3 className="mt-4 text-lg font-semibold">View Your Results</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              View your project score, strengths, and suggestions for
              improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
