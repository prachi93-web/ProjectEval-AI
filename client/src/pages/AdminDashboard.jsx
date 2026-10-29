import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/projects";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("highest");
  const [evaluatingId, setEvaluatingId] = useState(null);

  // Fetch all projects from the backend
  const fetchProjects = async () => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/all`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch projects.");
      }

      setProjects(data.projects || []);
    } catch (err) {
      console.error("Fetch projects error:", err);
      setError(
        err.message ||
          "Unable to load projects. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Dashboard statistics
  const evaluatedProjects = projects.filter(
    (project) => project.evaluationStatus === "evaluated"
  );

  const pendingProjects = projects.filter(
    (project) =>
      project.evaluationStatus === "pending" ||
      project.evaluationStatus === "evaluating"
  );

  const failedProjects = projects.filter(
    (project) => project.evaluationStatus === "failed"
  );

  const averageScore =
    evaluatedProjects.length > 0
      ? (
          evaluatedProjects.reduce(
            (total, project) => total + (Number(project.score) || 0),
            0
          ) / evaluatedProjects.length
        ).toFixed(1)
      : "—";

  // Search, filter, and sort projects
  const filteredProjects = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const filtered = projects.filter((project) => {
      const matchesSearch =
        (project.studentName || "").toLowerCase().includes(search) ||
        (project.title || "").toLowerCase().includes(search) ||
        (project.studentEmail || "").toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        project.evaluationStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      const scoreA =
        a.evaluationStatus === "evaluated"
          ? Number(a.score) || 0
          : -1;

      const scoreB =
        b.evaluationStatus === "evaluated"
          ? Number(b.score) || 0
          : -1;

      if (sortOrder === "highest") {
        return scoreB - scoreA;
      }

      if (sortOrder === "lowest") {
        return scoreA - scoreB;
      }

      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });
  }, [projects, searchTerm, statusFilter, sortOrder]);

  // Generate or retry an AI evaluation
  const handleEvaluate = async (projectId) => {
    try {
      setEvaluatingId(projectId);
      setError("");

      const response = await fetch(
        `${API_URL}/evaluate/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to generate the evaluation."
        );
      }

      // Refresh dashboard with the latest evaluation results
      await fetchProjects();
    } catch (err) {
      console.error("Evaluation error:", err);
      setError(
        err.message || "Evaluation failed. Please try again."
      );
    } finally {
      setEvaluatingId(null);
    }
  };

  // Status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "evaluated":
        return "bg-green-100 text-green-700";

      case "evaluating":
        return "bg-blue-100 text-blue-700";

      case "failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Pending";

    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl font-bold">
            Project<span className="text-violet-600">Eval AI</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 sm:inline-block">
              Admin Dashboard
            </span>

            <Link
              to="/"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-violet-600">
              Administration
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Project Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor student submissions and AI evaluation results.
            </p>
          </div>

          <button
            onClick={fetchProjects}
            disabled={loading}
            className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
          >
            {loading ? "Loading..." : "↻ Refresh Projects"}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-col justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center"
          >
            <p>{error}</p>

            <button
              onClick={fetchProjects}
              className="shrink-0 font-semibold underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Statistics cards */}
        <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Projects
              </p>
              <span className="rounded-xl bg-violet-100 p-3 text-xl">
                📁
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold">
              {projects.length}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              All student submissions
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Evaluated Projects
              </p>
              <span className="rounded-xl bg-green-100 p-3 text-xl">
                ✓
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-green-600">
              {evaluatedProjects.length}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              AI evaluation completed
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Pending Evaluations
              </p>
              <span className="rounded-xl bg-amber-100 p-3 text-xl">
                ◷
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-amber-600">
              {pendingProjects.length}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Waiting or currently processing
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Average Score
              </p>
              <span className="rounded-xl bg-blue-100 p-3 text-xl">
                ★
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-violet-600">
              {averageScore}
              {averageScore !== "—" && (
                <span className="text-lg text-slate-400">/100</span>
              )}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Across evaluated projects
            </p>
          </div>
        </section>

        {/* Projects table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-xl font-bold">
                  Student Projects
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Browse submissions and review their evaluations.
                </p>
              </div>

              <span className="w-fit rounded-full bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">
                {filteredProjects.length} projects found
              </span>
            </div>

            {/* Search and filters */}
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="md:col-span-1">
                <label htmlFor="projectSearch" className="sr-only">
                  Search projects
                </label>

                <input
                  id="projectSearch"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student or project..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label htmlFor="statusFilter" className="sr-only">
                  Filter by status
                </label>

                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="evaluated">Evaluated</option>
                  <option value="pending">Pending</option>
                  <option value="evaluating">Evaluating</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div>
                <label htmlFor="sortOrder" className="sr-only">
                  Sort projects
                </label>

                <select
                  id="sortOrder"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500"
                >
                  <option value="highest">Highest Score First</option>
                  <option value="lowest">Lowest Score First</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="flex flex-col items-center justify-center px-4 py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />

              <p className="mt-4 text-slate-500">
                Loading student projects...
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <div className="text-5xl">📂</div>

              <h3 className="mt-4 text-lg font-semibold">
                No projects submitted yet
              </h3>

              <p className="mt-2 text-slate-500">
                Student submissions will appear here.
              </p>

              <Link
                to="/student"
                className="mt-5 inline-block rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
              >
                Submit a Project
              </Link>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <h3 className="text-lg font-semibold">
                No matching projects
              </h3>

              <p className="mt-2 text-slate-500">
                Try changing your search or filter.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="mt-4 font-semibold text-violet-600 hover:text-violet-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Responsive table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">
                        Student
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Project
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Technologies
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Score
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Status
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Submitted
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredProjects.map((project) => (
                      <tr
                        key={project._id}
                        className="transition hover:bg-slate-50"
                      >
                        {/* Student */}
                        <td className="px-6 py-5">
                          <p className="font-semibold text-slate-800">
                            {project.studentName || "Unknown Student"}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {project.studentEmail || "No email"}
                          </p>
                        </td>

                        {/* Project */}
                        <td className="max-w-xs px-6 py-5">
                          <p className="font-semibold text-slate-800">
                            {project.title}
                          </p>

                          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                            {project.description}
                          </p>
                        </td>

                        {/* Technologies */}
                        <td className="px-6 py-5">
                          <div className="flex max-w-xs flex-wrap gap-1.5">
                            {(Array.isArray(project.technologies)
                              ? project.technologies
                              : []
                            )
                              .slice(0, 3)
                              .map((tech, index) => (
                                <span
                                  key={`${tech}-${index}`}
                                  className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                                >
                                  {tech}
                                </span>
                              ))}

                            {project.technologies?.length > 3 && (
                              <span className="text-xs text-slate-500">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Score */}
                        <td className="px-6 py-5">
                          {project.evaluationStatus === "evaluated" ? (
                            <span className="font-bold text-violet-700">
                              {Number(project.score) || 0}/100
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                              project.evaluationStatus
                            )}`}
                          >
                            {formatStatus(project.evaluationStatus)}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-500">
                          {formatDate(project.createdAt)}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                navigate(`/result/${project._id}`)
                              }
                              className="whitespace-nowrap font-semibold text-violet-600 hover:text-violet-800"
                            >
                              View Details
                            </button>

                            {(project.evaluationStatus === "pending" ||
                              project.evaluationStatus === "failed") && (
                              <button
                                onClick={() =>
                                  handleEvaluate(project._id)
                                }
                                disabled={evaluatingId !== null}
                                className="whitespace-nowrap rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {evaluatingId === project._id
                                  ? "Evaluating..."
                                  : "Evaluate"}
                              </button>
                            )}

                            {project.evaluationStatus === "evaluating" && (
                              <span className="whitespace-nowrap text-xs text-blue-600">
                                In progress
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table footer */}
              <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-500">
                Showing {filteredProjects.length} of {projects.length} projects
                {failedProjects.length > 0 && (
                  <span className="ml-2 text-red-600">
                    · {failedProjects.length} failed evaluation
                    {failedProjects.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </>
          )}
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-slate-500">
          ProjectEval AI · Student Project Evaluation System
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;