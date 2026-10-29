import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentInput = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (loading) return;

    setLoading(true);
    setError("");
    setStatusMessage("Submitting your project...");

    let projectId = null;

    try {
      // Convert comma-separated technologies into an array
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech !== ""),
      };

      // STEP 1: Save the project in MongoDB
      const addResponse = await fetch(
        "http://localhost:5000/api/projects/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        },
      );

      const addData = await addResponse.json();

      if (!addResponse.ok || !addData.success || !addData.project?._id) {
        throw new Error(addData.message || "Failed to submit your project.");
      }

      projectId = addData.project._id;

      // STEP 2: Generate the AI evaluation
      setStatusMessage("Project submitted! Generating AI evaluation...");

      const evaluateResponse = await fetch(
        `http://localhost:5000/api/projects/evaluate/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const evaluateData = await evaluateResponse.json();

      if (!evaluateResponse.ok || !evaluateData.success) {
        // The project is already saved, so don't submit it again.
        // Open its result page, where evaluation can be retried.
        navigate(`/result/${projectId}`, { replace: true });
        return;
      }

      // STEP 3: Open the evaluation results page
      navigate(`/result/${projectId}`, { replace: true });
    } catch (err) {
      console.error("Project submission error:", err);

      if (projectId) {
        // The project was saved, but the request may have failed
        // while generating its evaluation.
        navigate(`/result/${projectId}`, { replace: true });
      } else {
        setError(
          err.message || "Unable to submit your project. Please try again.",
        );
      }
    } finally {
      setLoading(false);
      setStatusMessage("");
    }
  };

  const inputClass =
    "mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-100";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      {/* Page Header */}
      <div className="mx-auto mb-8 max-w-3xl">
        <Link
          to="/"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-5 text-3xl font-bold text-slate-900">
          Student Project Submission
        </h1>

        <p className="mt-3 leading-6 text-slate-600">
          Submit your project details to receive an AI-generated evaluation,
          score, and suggestions for improvement.
        </p>
      </div>

      {/* Form Container */}
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Project Details
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please complete all the required fields.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Student Name */}
          <div>
            <label
              htmlFor="studentName"
              className="block font-medium text-slate-700"
            >
              Student Name
            </label>

            <input
              id="studentName"
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClass}
              autoComplete="name"
              required
              disabled={loading}
            />
          </div>

          {/* Student Email */}
          <div>
            <label
              htmlFor="studentEmail"
              className="block font-medium text-slate-700"
            >
              Student Email
            </label>

            <input
              id="studentEmail"
              type="email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={inputClass}
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>

          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-slate-700">
              Project Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. AI Trip Planner"
              className={inputClass}
              required
              disabled={loading}
            />
          </div>

          {/* Project Description */}
          <div>
            <label
              htmlFor="description"
              className="block font-medium text-slate-700"
            >
              Project Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project, its purpose, features, and functionality..."
              rows={5}
              className={inputClass}
              required
              disabled={loading}
            />
          </div>

          {/* Technologies */}
          <div>
            <label
              htmlFor="technologies"
              className="block font-medium text-slate-700"
            >
              Technologies Used
            </label>

            <input
              id="technologies"
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className={inputClass}
              required
              disabled={loading}
            />

            <p className="mt-2 text-xs text-slate-500">
              Separate technologies with commas.
            </p>
          </div>

          {/* GitHub URL */}
          <div>
            <label
              htmlFor="githubUrl"
              className="block font-medium text-slate-700"
            >
              GitHub Repository URL
            </label>

            <input
              id="githubUrl"
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
              className={inputClass}
              required
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* Loading Status */}
          {statusMessage && (
            <p role="status" className="text-center text-sm text-violet-600">
              {statusMessage}
            </p>
          )}

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && (
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                aria-hidden="true"
              />
            )}

            <span>
              {loading
                ? "Generating Evaluation..."
                : "Submit & Evaluate Project"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentInput;
