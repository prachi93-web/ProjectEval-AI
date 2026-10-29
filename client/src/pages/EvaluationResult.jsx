import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EvaluationResult = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState("");

  // Fetch project details
  const fetchProject = async () => {
    try {
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch project details.");
      }

      setProject(data.project);
    } catch (error) {
      setError(error.message || "Unable to load project details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch project when page loads
  useEffect(() => {
    fetchProject();
  }, [id]);

  // Generate AI evaluation
  const handleEvaluate = async () => {
    try {
      setEvaluating(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/generate-evaluation/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to generate evaluation.");
      }

      setProject(data.project);
    } catch (error) {
      setError(error.message || "Unable to generate AI evaluation.");

      // Refresh project status after a failed request
      await fetchProject();
    } finally {
      setEvaluating(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg text-slate-600">Loading project details...</p>
      </div>
    );
  }

  // Project fetch error
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Project Not Found</h1>

        <p className="mt-3 text-slate-600">
          {error || "We could not find this project."}
        </p>

        <Link
          to="/student"
          className="mt-6 rounded-lg bg-violet-600 px-5 py-3 font-medium text-white hover:bg-violet-700"
        >
          Submit Another Project
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      {/* Header */}
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          ← Back to Home
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium uppercase tracking-wide text-violet-600">
            ProjectEval AI
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Project Evaluation
          </h1>

          <p className="mt-3 text-slate-600">
            Review your submitted project and discover opportunities to improve
            it.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl space-y-6">
        {/* Project Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {project.title}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Submitted by {project.studentName}
              </p>
            </div>

            <span className="w-fit rounded-full bg-violet-100 px-3 py-1 text-sm font-medium capitalize text-violet-700">
              {project.evaluationStatus}
            </span>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-slate-800">
              Project Description
            </h3>

            <p className="mt-2 whitespace-pre-line leading-7 text-slate-600">
              {project.description}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-slate-800">Technologies Used</h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies?.map((technology, index) => (
                <span
                  key={`${technology}-${index}`}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-slate-800">GitHub Repository</h3>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block break-all text-violet-600 hover:underline"
            >
              {project.githubUrl}
            </a>
          </div>
        </div>

        {/* Evaluation Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            AI Evaluation Results
          </h2>

          <p className="mt-2 text-slate-600">
            Get an AI-generated score, strengths, improvements, and suggestions
            for your project.
          </p>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* Pending Evaluation */}
          {(project.evaluationStatus === "pending" ||
            project.evaluationStatus === "failed") && (
            <div className="mt-6 rounded-xl bg-violet-50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                Ready to Evaluate Your Project?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Click below to generate your AI evaluation.
              </p>

              <button
                onClick={handleEvaluate}
                disabled={evaluating}
                className="mt-5 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {evaluating
                  ? "Evaluating Project..."
                  : "Generate AI Evaluation"}
              </button>
            </div>
          )}

          {/* Currently Evaluating */}
          {project.evaluationStatus === "evaluating" && (
            <div className="mt-6 rounded-xl bg-amber-50 p-5 text-center">
              <p className="font-medium text-amber-800">
                Your project is currently being evaluated.
              </p>

              <button
                onClick={fetchProject}
                className="mt-3 text-sm font-medium text-violet-600 hover:underline"
              >
                Refresh Status
              </button>
            </div>
          )}

          {/* Evaluation Results */}
          {project.evaluationStatus === "evaluated" && (
            <div className="mt-6 space-y-6">
              {/* Score */}
              <div className="rounded-xl bg-violet-50 p-6 text-center">
                <p className="font-medium text-violet-700">
                  Overall Project Score
                </p>

                <p className="mt-2 text-5xl font-bold text-violet-700">
                  {project.score}
                  <span className="text-2xl">/100</span>
                </p>
              </div>

              {/* Strengths */}
              <div className="rounded-xl border border-green-200 p-5">
                <h3 className="text-lg font-semibold text-green-700">
                  Strengths
                </h3>

                {project.strengths?.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                    {project.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-slate-500">No strengths available.</p>
                )}
              </div>

              {/* Improvements */}
              <div className="rounded-xl border border-amber-200 p-5">
                <h3 className="text-lg font-semibold text-amber-700">
                  Areas for Improvement
                </h3>

                {project.improvements?.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                    {project.improvements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-slate-500">
                    No improvement areas available.
                  </p>
                )}
              </div>

              {/* Suggestions */}
              <div className="rounded-xl border border-violet-200 p-5">
                <h3 className="text-lg font-semibold text-violet-700">
                  Suggestions
                </h3>

                {project.suggestions?.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                    {project.suggestions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-slate-500">
                    No suggestions available.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-wrap gap-4 pb-6">
          <Link
            to="/student"
            className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-white"
          >
            Submit Another Project
          </Link>

          <Link
            to="/"
            className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EvaluationResult;
