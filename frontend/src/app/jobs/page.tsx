"use client";

import { useEffect, useState } from "react";
import { FiChevronsRight, FiChevronsLeft, FiChevronDown } from "react-icons/fi";
import api from "@/lib/axios";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  // Filters (simple version)
  const [typeFilter, setTypeFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(0);
  const jobsPerPage = 4;

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic ----------------------------------------------------
  const filtered = jobs.filter((job: any) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchType = typeFilter ? job.type === typeFilter : true;
    const matchLevel = levelFilter ? job.level === levelFilter : true;

    return matchSearch && matchType && matchLevel;
  });

  // Pagination logic
  const pageCount = Math.ceil(filtered.length / jobsPerPage);
  const pageStart = page * jobsPerPage;
  const currentJobs = filtered.slice(pageStart, pageStart + jobsPerPage);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">

      {/* Banner */}
      <div
        className="rounded-lg p-8 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      >
        <h1 className="text-3xl font-bold">Let's find your dream Job</h1>
        <p className="opacity-90">Tuesday, 24 Jan 2023</p>

        {/* Search Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Job Title..."
            className="px-4 py-2 rounded-md text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            placeholder="Location..."
            className="px-4 py-2 rounded-md text-black"
          />
          <button className="bg-primary text-white px-6 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-10">
        {/* --------------------------------- FILTER SIDEBAR --------------------------------- */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Type of Employment</h3>
            <div className="space-y-2">
              {["Full Time", "Part Time", "Remote"].map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="type"
                    checked={typeFilter === t}
                    onChange={() => setTypeFilter(t)}
                  />
                  {t}
                </label>
              ))}
              <button
                className="text-xs text-blue-600 mt-1"
                onClick={() => setTypeFilter("")}
              >
                Clear
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Experience Level</h3>
            <div className="space-y-2">
              {["Senior", "Mid Level", "Entry Level"].map((l) => (
                <label key={l} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="level"
                    checked={levelFilter === l}
                    onChange={() => setLevelFilter(l)}
                  />
                  {l}
                </label>
              ))}
              <button
                className="text-xs text-blue-600 mt-1"
                onClick={() => setLevelFilter("")}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* -------------------------------- JOB LIST -------------------------------- */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">
              <span className="opacity-70">Showing: </span>
              {filtered.length} Jobs
            </p>

            <div className="flex items-center gap-2 text-sm">
              Sort by:
              <span className="text-primary flex items-center gap-1">
                Posted Recently <FiChevronDown />
              </span>
            </div>
          </div>

          {loading && <p>Loading...</p>}

          {currentJobs.map((job: any) => (
            <div
              key={job.id}
              className="p-5 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-500">
                {job.company} • {job.location}
              </p>

              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="bg-gray-200 px-2 py-1 rounded">
                  {job.type}
                </span>
                <span className="bg-gray-200 px-2 py-1 rounded">
                  {job.level}
                </span>
              </div>

              <div className="flex justify-end mt-3">
                <button className="bg-green-500 text-white px-4 py-1 rounded">
                  Apply Now
                </button>
              </div>
            </div>
          ))}

          {/* ------------------------- PAGINATION ------------------------- */}
          {pageCount > 1 && (
            <div className="flex gap-2 justify-center mt-4">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                className="px-3 py-1 border rounded"
              >
                <FiChevronsLeft />
              </button>

              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`px-3 py-1 border rounded ${
                    i === page ? "bg-primary text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
                className="px-3 py-1 border rounded"
              >
                <FiChevronsRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
