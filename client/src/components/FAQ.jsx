import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "What is ProjectEval AI?",
    answer:
      "ProjectEval AI is an AI-powered platform that evaluates student projects and provides an overall score, strengths, areas for improvement, and suggestions.",
  },
  {
    question: "How do I evaluate my project?",
    answer:
      "Click Evaluate My Project, enter your details, provide your project title and description, list the technologies used, and add your GitHub repository URL. Submit the form to receive your AI-generated evaluation.",
  },
  {
    question: "How does the AI evaluate my project?",
    answer:
      "ProjectEval AI uses Google's Gemini AI to analyze the project information you submit. It generates a score, identifies strengths, highlights areas for improvement, and provides useful suggestions. The current version evaluates the submitted details rather than automatically inspecting your repository's source code.",
  },
  {
    question: "Is the AI evaluation always accurate?",
    answer:
      "AI-generated feedback may sometimes be incomplete or incorrect. Treat the score and suggestions as helpful guidance rather than a guaranteed measure of your project's quality.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  return (
    <section id="faq" className="bg-violet-50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700 sm:text-sm">
            <span aria-hidden="true">💬</span>
            Frequently Asked Questions
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Got Questions?
            <span className="ml-2 bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              We've Got Answers.
            </span>
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Everything you need to know about ProjectEval AI.
          </p>
        </div>

        {/* Compact FAQ accordion */}
        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-violet-200 bg-white shadow-md shadow-violet-100"
                    : "border-slate-200 bg-white hover:border-violet-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
                >
                  <span className="text-sm font-semibold leading-5 text-slate-800 sm:text-base">
                    {faq.question}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg transition-all duration-200 ${
                      isOpen
                        ? "rotate-45 bg-violet-600 text-white"
                        : "bg-violet-100 text-violet-700"
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="px-4 pb-4 sm:px-5"
                  >
                    <p className="border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Compact call to action */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-5 text-center sm:flex-row sm:px-6 sm:text-left">
          <div>
            <h3 className="text-base font-bold text-white sm:text-lg">
              Ready to evaluate your project?
            </h3>
            <p className="mt-1 text-sm text-violet-100">
              Get feedback and discover ways to improve your work.
            </p>
          </div>

          <Link
            to="/student"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            Get Started <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
